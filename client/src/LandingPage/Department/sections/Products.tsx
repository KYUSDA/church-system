import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsSection } from "./department";

interface ProductsProps {
  data: ProductsSection;
}

function Products({ data }: ProductsProps) {
  if (!data?.products?.length) return null;

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-5xl font-bold tracking-tight">
            <span className="text-blue-600">{data.title.split(" ")[0]}</span>{" "}
            {data.title.split(" ").slice(1).join(" ")}  
          </h2>

          <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 rounded-full px-8 py-5 text-base"
            >
              More in Store
            </Button>
          </div>
        </div>

        {/* ---------- Products Grid ---------- */}
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {data.products.map((product, idx) => (
            <div key={idx} className="overflow-hidden">
              {/* Side-by-side layout using flex */}
              <div className="flex flex-col sm:flex-row">
                {/* Image Container */}
                <div className="sm:w-2/5">
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.tags?.[0] || "product"}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="sm:w-3/5 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold leading-snug mb-3">
                      {product.description || "Natural product"}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="pt-3 border-t border-gray-200" />

                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">
                        Ksh {product.price}
                      </span>

                      {/* Color/Variant dots */}
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400" />
                        <span className="w-3 h-3 rounded-full bg-gray-800 border border-gray-900" />
                      </div>
                    </div>

                    <button
                      disabled={!product.inStock}
                      className="w-full flex items-center justify-center gap-1.5 text-sm hover:text-blue-500 transition-colors disabled:opacity-50 border border-gray-300 rounded-lg py-2 hover:border-blue-500"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="text-xs">Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
