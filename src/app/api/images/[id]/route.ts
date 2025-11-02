import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { db } = await connectToDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'productImages' });

    const fileId = new ObjectId(id);
    const downloadStream = bucket.openDownloadStream(fileId);

    // Get file metadata
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const file = files[0];
    const contentType = file.contentType || 'application/octet-stream';

    // Stream the file
    const response = new Response(downloadStream as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': file.length.toString(),
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

    return response;
  } catch (error) {
    console.error('Error streaming image:', error);
    return NextResponse.json({ error: 'Failed to stream image' }, { status: 500 });
  }
}