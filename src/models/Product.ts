import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../lib/mongodb';

export type ProductCategory = 'Mattress' | 'Bolster' | 'Cushion' | 'Pillow' | 'Quilts' | 'Sheet';

export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  images: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllProducts(category?: ProductCategory): Promise<Product[]> {
  const { db } = await connectToDatabase();
  const filter = category ? { category } : {};
  const products = await db.collection('products').find(filter).toArray();
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