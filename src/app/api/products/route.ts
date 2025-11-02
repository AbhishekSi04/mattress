import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { getAllProducts, createProduct } from '../../../models/Product';
import { connectToDatabase } from '../../../lib/mongodb';
import { GridFSBucket } from 'mongodb';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Starting product creation...');

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Connecting to database...');
    const { db } = await connectToDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'productImages' });

    console.log('Parsing form data...');
    // Parse multipart form data using FormData API
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const sizes = formData.get('sizes') as string;
    const images = formData.getAll('images') as File[];

    console.log('Form data received:', { name, price, sizes, imageCount: images?.length });

    // Validate inputs
    if (!name || !price || !sizes || !images || images.length === 0) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const productName = name.trim();
    const productPrice = parseFloat(price);
    const productSizes = sizes.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (!productName || isNaN(productPrice) || productPrice <= 0 || productSizes.length === 0) {
      console.log('Invalid input data');
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Check total file size (Vercel limit is ~5MB)
    let totalSize = 0;
    for (const file of images) {
      if (file) totalSize += file.size;
    }

    if (totalSize > 4 * 1024 * 1024) { // 4MB limit to be safe
      console.log(`Total file size too large: ${totalSize} bytes`);
      return NextResponse.json({ error: 'Total file size exceeds 4MB limit. Please reduce image sizes or upload fewer images.' }, { status: 413 });
    }

    console.log('Uploading images to GridFS...');
    // Upload images to GridFS
    const imageIds: any[] = [];

    for (const file of images) {
      if (!file) continue;

      console.log(`Processing file: ${file.name}, size: ${file.size}, type: ${file.type}`);

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        console.log(`Invalid file type: ${file.type}`);
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

      // Validate file size (max 2MB per file)
      if (file.size > 2 * 1024 * 1024) {
        console.log(`File too large: ${file.name} (${file.size} bytes)`);
        return NextResponse.json({ error: `File ${file.name} is too large. Maximum size is 2MB per file.` }, { status: 413 });
      }

      try {
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadStream = bucket.openUploadStream(file.name || 'image', {
          contentType: file.type,
        });

        uploadStream.write(buffer);
        uploadStream.end();

        await new Promise((resolve, reject) => {
          uploadStream.on('finish', () => {
            console.log(`Upload finished for ${file.name}, ID: ${uploadStream.id}`);
            imageIds.push(uploadStream.id);
            resolve(void 0);
          });
          uploadStream.on('error', (error) => {
            console.error(`Upload error for ${file.name}:`, error);
            reject(error);
          });
        });
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        return NextResponse.json({ error: `Failed to process file ${file.name}` }, { status: 500 });
      }
    }

    console.log('Creating product in database...');
    // Create product
    const product = await createProduct({
      name: productName,
      price: productPrice,
      sizes: productSizes,
      images: imageIds,
    });

    console.log('Product created successfully:', product);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      error: 'Failed to create product',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}