import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../lib/mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  sizes: string[];
  images: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllProducts(): Promise<Product[]> {
  const { db } = await connectToDatabase();
  const products = await db.collection('products').find({}).toArray();
  return products as Product[];
}

export async function createProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const { db } = await connectToDatabase();
  const now = new Date();
  const newProduct: Product = {
    ...product,
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection('products').insertOne(newProduct);
  return { ...newProduct, _id: result.insertedId };
}

export async function getProductById(id: string): Promise<Product | null> {
  const { db } = await connectToDatabase();
  const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
  return product as Product | null;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
  const { db } = await connectToDatabase();

  // First check if product exists
  const existingProduct = await db.collection('products').findOne({ _id: new ObjectId(id) });
  if (!existingProduct) {
    return null;
  }

  // Update the product
  await db.collection('products').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    }
  );

  // Return the updated product
  const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(id) });
  return updatedProduct as Product | null;
}export async function deleteProduct(id: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}