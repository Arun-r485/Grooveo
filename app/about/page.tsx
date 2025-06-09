import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-grooveo-primary-700">About Grooveo</h1>
        <p className="text-xl max-w-3xl mx-auto text-grooveo-neutral-700">
          Revolutionizing packaging with sustainable solutions that don't compromise on quality or design.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-grooveo-primary-600">Our Story</h2>
          <p className="mb-4 text-grooveo-neutral-700">
            Grooveo was founded in 2025 by a team of environmental scientists and packaging designers who shared a
            vision: to transform the packaging industry by creating beautiful, functional packaging that doesn't harm
            our planet.
          </p>
          <p className="mb-4 text-grooveo-neutral-700">
            What started as a small workshop in Portland has grown into a global leader in sustainable packaging
            solutions, serving thousands of businesses committed to reducing their environmental footprint.
          </p>
          <p className="text-grooveo-neutral-700">
            Our name "Grooveo" combines "groove" (representing our innovative designs) and "eco" (highlighting our
            environmental commitment) – perfectly capturing our mission to make sustainability the standard, not the
            exception.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Grooveo team working on sustainable packaging designs"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-16 bg-grooveo-primary-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-grooveo-primary-700">Our Mission</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-center italic text-grooveo-primary-800">
            "To create innovative, beautiful packaging solutions that protect products and the planet, making
            sustainability accessible to businesses of all sizes."
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Environmental Responsibility",
              description:
                "We prioritize the planet in every decision, from material sourcing to manufacturing processes.",
              icon: "🌱",
            },
            {
              title: "Innovation",
              description:
                "We constantly push boundaries to create packaging solutions that are both sustainable and functional.",
              icon: "💡",
            },
            {
              title: "Transparency",
              description:
                "We believe in honest communication about our products, processes, and environmental impact.",
              icon: "🔍",
            },
            {
              title: "Quality",
              description:
                "We never compromise on quality, ensuring our sustainable solutions perform as well as or better than traditional alternatives.",
              icon: "✨",
            },
            {
              title: "Accessibility",
              description:
                "We strive to make sustainable packaging solutions available and affordable for businesses of all sizes.",
              icon: "🤝",
            },
            {
              title: "Education",
              description:
                "We're committed to raising awareness about packaging waste and empowering businesses to make better choices.",
              icon: "📚",
            },
          ].map((value, index) => (
            <Card key={index} className="border-grooveo-primary-200 hover:border-grooveo-primary-400 transition-colors">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-grooveo-primary-600">{value.title}</h3>
                <p className="text-grooveo-neutral-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              name: "Emma Chen",
              role: "Founder & CEO",
              bio: "Environmental scientist with a passion for sustainable design",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Marcus Johnson",
              role: "Head of Product Innovation",
              bio: "Former packaging engineer with 15+ years of experience",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Sophia Rodriguez",
              role: "Sustainability Director",
              bio: "Expert in circular economy principles and zero waste",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "David Kim",
              role: "Creative Director",
              bio: "Award-winning designer focused on eco-friendly aesthetics",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-grooveo-primary-600">{member.name}</h3>
              <p className="text-grooveo-secondary-500 font-medium">{member.role}</p>
              <p className="text-grooveo-neutral-600 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Us */}
      <section className="bg-grooveo-primary-600 text-black p-12 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="max-w-2xl mx-auto mb-8 text-black">
          Ready to make a difference with your packaging choices? Explore our sustainable solutions and join thousands
          of businesses committed to protecting our planet.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent text-black hover:bg-white hover:text-grooveo-primary-600"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
