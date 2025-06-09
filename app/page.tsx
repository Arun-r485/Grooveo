import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Package, Recycle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import { featuredProducts } from "@/lib/products"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                Sustainable Packaging Solutions
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Packaging that's good for your products and the planet
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our range of eco-friendly packaging solutions made from sustainable materials. Reduce your
                environmental impact without compromising on quality or design.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sustainability">
                  <Button variant="outline">Learn About Sustainability</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Eco-friendly packaging products"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                Our Commitment
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Eco-Conscious Packaging?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our packaging solutions are designed with sustainability in mind, helping you reduce your environmental
                footprint while enhancing your brand image.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Recyclable Materials</h3>
                <p className="text-gray-500">
                  All our packaging is made from recyclable materials, reducing waste and environmental impact.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Biodegradable Options</h3>
                <p className="text-gray-500">
                  Our biodegradable packaging breaks down naturally, leaving no harmful residues.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Minimal Design</h3>
                <p className="text-gray-500">
                  Efficient designs that minimize material usage while maximizing protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                Featured Products
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Best Sellers</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most popular eco-friendly packaging solutions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Sustainable Packaging Movement
              </h2>
              <p className="max-w-[600px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Subscribe to our newsletter for the latest updates on sustainable packaging innovations, exclusive
                offers, and eco-friendly tips.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto lg:mx-0">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-green-400 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" className="bg-white text-green-600 hover:bg-green-50">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-green-100">By subscribing, you agree to our terms and privacy policy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
