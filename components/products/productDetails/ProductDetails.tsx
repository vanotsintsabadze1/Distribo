"use client";

import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductQualityControl from "./ProductQualityControl";
import ProductInfoCard from "./ProductInfoCard";
import OrderCreationForm from "@/components/orders/OrderCreationForm";
import { UserRole } from "@/lib/constants/constants";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: Product;
  userRole: string | null;
}

export default function ProductDetails({ product, userRole }: ProductDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{product.name}</h1>
          <ProductImagesCarousel images={product.images} />
          <ProductInfoCard />
          <div>
            <h2 className="mb-2 text-xl font-semibold">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
        <div className="space-y-6">
          {userRole === UserRole.User || userRole === UserRole.RootUser ? (
            <OrderCreationForm product={product} />
          ) : (
            <ProductPrice price={product.price} />
          )}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Inventory Status</h2>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Current Stock</span>
                  <span
                    className={`ml-4 rounded-full px-4 py-2 ${
                      product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductQualityControl />
        </div>
      </div>
    </div>
  );
}
