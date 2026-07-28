import { ipcMain } from "electron";
import { NewProduct } from "src/database/schema/product.schema";
import * as ProductService from "./product.service";

export function registerProductIpcHandlers() {
  ipcMain.handle("products:create", (_event, data: NewProduct) =>
    ProductService.createProduct(data),
  );
  ipcMain.handle("products:list", () => ProductService.listProducts());
  ipcMain.handle(
    "products:update",
    (_event, { id, data }: { id: string; data: Partial<NewProduct> }) =>
      ProductService.updateProduct(id, data),
  );
  ipcMain.handle("products:delete", (_event, { id }: { id: string }) =>
    ProductService.deleteProduct(id),
  );
}
