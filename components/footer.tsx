import Link from "next/link"
import { Package, Twitter, Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">Grooveo</span>
            </div>
            <p className="text-sm text-gray-600">
              Sustainable packaging solutions for a greener future. Committed to reducing environmental impact.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-gray-600 hover:text-primary-500">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-sm text-gray-600 hover:text-primary-500">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-primary-500">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-primary-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=mailers" className="text-sm text-gray-600 hover:text-primary-500">
                  Mailers
                </Link>
              </li>
              <li>
                <Link href="/products?category=boxes" className="text-sm text-gray-600 hover:text-primary-500">
                  Shipping Boxes
                </Link>
              </li>
              <li>
                <Link href="/products?category=tape" className="text-sm text-gray-600 hover:text-primary-500">
                  Packaging Tape
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email:{" "}
                <a href="mailto:info@grooveo.com" className="hover:text-primary-500">
                  info@grooveo.com
                </a>
              </li>
              <li className="text-sm text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Grooveo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
