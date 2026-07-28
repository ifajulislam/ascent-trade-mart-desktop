// src/main/features/products/product.service.ts
import { eq } from "drizzle-orm";
import { db } from "../../../database/db";
import {
  products,
  type NewProduct,
  type Product,
} from "src/database/schema/product.schema";

export async function createProduct(data: NewProduct): Promise<Product> {
  const [product] = db.insert(products).values(data).returning().all();
  if (!product) throw new Error("Failed to create product");
  return product;
}

export async function listProducts(): Promise<Product[]> {
  return db.select().from(products).all();
}

export async function updateProduct(
  id: string,
  data: Partial<NewProduct>,
): Promise<Product> {
  const [updated] = db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()
    .all();
  if (!updated) throw new Error("Product not found");
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  db.delete(products).where(eq(products.id, id)).run();
}
