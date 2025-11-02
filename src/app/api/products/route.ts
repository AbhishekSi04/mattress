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
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'productImages' });

    // Parse multipart form data using FormData API
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const sizes = formData.get('sizes') as string;
    const images = formData.getAll('images') as File[];

    // Validate inputs
    if (!name || !price || !sizes || !images || images.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const productName = name.trim();
    const productPrice = parseFloat(price);
    const productSizes = sizes.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (!productName || isNaN(productPrice) || productPrice <= 0 || productSizes.length === 0) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Upload images to GridFS
    const imageIds: any[] = [];

    for (const file of images) {
      if (!file) continue;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

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
          imageIds.push(uploadStream.id);
          resolve(void 0);
        });
        uploadStream.on('error', reject);
      });
    }

    // Create product
    const product = await createProduct({
      name: productName,
      price: productPrice,
      sizes: productSizes,
      images: imageIds,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}