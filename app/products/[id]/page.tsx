"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Leaf, Package, ShoppingCart, Star, Recycle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { allProducts } from "@/lib/products"
import { useCart } from "@/context/cart-context"
import { WishlistButton } from "@/components/wishlist-button"
import { StockIndicator } from "@/components/stock-indicator"
import { SocialShare } from "@/components/social-share"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product from an API or database
  const product = allProducts.find((p) => p.id === params.id) || allProducts[0]
  const { addItem } = useCart()

  const isOutOfStock = product.stockCount <= 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-4">
        <Link href="/products" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white relative">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={`${product.name} - High quality ${product.material} packaging made from sustainable materials, perfect for eco-conscious businesses`}
                width={600}
                height={600}
                className="aspect-square object-cover"
              />

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="bg-red-100 text-red-800 px-6 py-3 rounded-md font-medium text-lg transform -rotate-6 shadow-sm">
                    Out of Stock
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} main view showing eco-friendly packaging design`}
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} detail view highlighting sustainable material construction`}
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} usage example demonstrating practical application`}
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} close-up showing texture and quality of ${product.material} material`}
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eco-Friendly</Badge>
                {product.material && <Badge variant="outline">{product.material}</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">4.0 (24 reviews)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">₹{(product.price / 100).toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{(product.compareAtPrice / 100).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Prominent Stock Indicator */}
              <div className="mt-2 p-3 rounded-md bg-gray-50 border">
                <StockIndicator stockCount={product.stockCount} variant="prominent" />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="font-medium">Description</h2>
              <p className="text-gray-500">{product.description}</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600 shrink-0" />
                  <span>100% recyclable and biodegradable</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600 shrink-0" />
                  <span>Made from sustainable materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600 shrink-0" />
                  <span>Reduces carbon footprint</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600 shrink-0" />
                  <span>Durable and protective design</span>
                </li>
              </ul>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="font-medium">Environmental Impact</span>
              </div>
              <p className="text-sm text-gray-500">
                By choosing this product, you're helping to save approximately 2.5kg of plastic waste and reducing
                carbon emissions by up to 60% compared to traditional packaging.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => addItem(product)}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <WishlistButton product={product} variant="button" showText={true} className="flex-1" />
              </div>

              {/* Social Share Component */}
              <SocialShare
                title={product.name}
                description={
                  product.description ||
                  `Eco-friendly ${product.category} made from sustainable ${product.material || "materials"}`
                }
                imageUrl={product.image || "/placeholder.svg?height=600&width=600"}
                className="mt-4"
              />

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled={isOutOfStock}>
                  Bulk Order
                </Button>
              </div>

              {/* Stock notification for out of stock items */}
              {isOutOfStock && (
                <div className="mt-2 p-3 rounded-md bg-red-50 border border-red-100">
                  <p className="text-sm text-red-800 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    This item is currently out of stock. Sign up to be notified when it's back in stock.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-1 text-sm border rounded-md"
                    />
                    <Button size="sm" variant="secondary">
                      Notify Me
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Details</h3>
                <p>
                  Our eco-friendly packaging solutions are designed to provide maximum protection while minimizing
                  environmental impact. Made from sustainable materials, our products are fully recyclable and
                  biodegradable, helping you reduce your carbon footprint without compromising on quality or
                  performance.
                </p>
                <p>
                  Each product is carefully crafted to meet the highest standards of durability and functionality,
                  ensuring that your items arrive safely at their destination while also making a positive impact on the
                  planet.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Dimensions</h4>
                    <p className="text-gray-500">
                      Width: {product.dimensions?.width || "10"} cm
                      <br />
                      Height: {product.dimensions?.height || "15"} cm
                      <br />
                      Depth: {product.dimensions?.depth || "5"} cm
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Material</h4>
                    <p className="text-gray-500">{product.material || "Recycled Paper"}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Weight</h4>
                    <p className="text-gray-500">{product.weight || "50"} g</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Certifications</h4>
                    <p className="text-gray-500">FSC Certified, Compostable</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Excellent Product</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      I love these eco-friendly packaging materials! They're sturdy enough to protect my products during
                      shipping, and my customers appreciate the sustainable approach. Will definitely order again.
                    </p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Sarah T.</span> - Verified Buyer, June 2, 2025
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Great Alternative to Plastic</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      These packaging solutions have helped our business reduce plastic waste significantly. Our
                      customers have noticed and appreciate our commitment to sustainability.
                    </p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Michael R.</span> - Verified Buyer, May 15, 2025
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Good Product, Slow Shipping</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      The product itself is great, but shipping took longer than expected. Otherwise, very happy with
                      the quality and eco-friendly aspects.
                    </p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Jessica L.</span> - Verified Buyer, April 28, 2025
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sustainability Information</h3>
                <p>
                  At Grooveo, we're committed to creating packaging solutions that minimize environmental impact. Our
                  products are designed with sustainability in mind at every stage of their lifecycle.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <Leaf className="mr-2 h-5 w-5 text-green-600" />
                      Materials
                    </h4>
                    <p className="text-sm text-gray-500">
                      Made from 100% post-consumer recycled materials or renewable resources like bamboo and cornstarch.
                      No harmful chemicals or plastics are used in our production process.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <Recycle className="mr-2 h-5 w-5 text-green-600" />
                      End of Life
                    </h4>
                    <p className="text-sm text-gray-500">
                      Our products are fully recyclable, biodegradable, or compostable, ensuring they don't end up in
                      landfills or oceans. Most items will naturally decompose within 180 days in proper conditions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <Package className="mr-2 h-5 w-5 text-green-600" />
                      Carbon Footprint
                    </h4>
                    <p className="text-sm text-gray-500">
                      Our manufacturing process produces 60% less carbon emissions compared to traditional packaging. We
                      also offset our carbon footprint through verified reforestation projects.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                      Certifications
                    </h4>
                    <p className="text-sm text-gray-500">
                      Our products are certified by leading environmental organizations including FSC (Forest
                      Stewardship Council), BPI (Biodegradable Products Institute), and carry the Compostable logo where
                      applicable.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {allProducts.slice(0, 4).map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group">
                <div className="overflow-hidden rounded-lg border bg-white relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                    alt={`${relatedProduct.name} - ${relatedProduct.material} sustainable packaging solution`}
                    width={300}
                    height={300}
                    className="aspect-square object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Out of Stock Overlay for Related Products */}
                  {relatedProduct.stockCount <= 0 && (
                    <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-red-100 text-red-800 px-3 py-1 rounded-md font-medium text-xs transform -rotate-6">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium group-hover:underline">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-500">₹{(relatedProduct.price / 100).toFixed(2)}</p>
                  </div>
                  <StockIndicator stockCount={relatedProduct.stockCount} variant="subtle" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
