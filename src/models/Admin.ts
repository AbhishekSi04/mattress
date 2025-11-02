import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../lib/mongodb';

export interface Admin {
  _id?: ObjectId;
  email: string;
  password: string; // hashed
  role: string;
}

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const { db } = await connectToDatabase();
  const admin = await db.collection('admins').findOne({ email });
  return admin as Admin | null;
}

export async function createAdmin(admin: Omit<Admin, '_id'>): Promise<Admin> {
  const { db } = await connectToDatabase();
  const result = await db.collection('admins').insertOne(admin);
  return { ...admin, _id: result.insertedId };
}