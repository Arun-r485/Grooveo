import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

export default function SustainabilityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-grooveo-primary-700">Our Sustainability Commitment</h1>
        <p className="text-xl max-w-3xl mx-auto text-grooveo-neutral-700">
          At Grooveo, sustainability isn't just a feature—it's our foundation. Discover how we're reimagining packaging
          for a healthier planet.
        </p>
      </section>

      {/* Impact Overview */}
      <section className="mb-16 bg-grooveo-primary-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Impact So Far</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              metric: "2.4M kg",
              description: "Plastic waste prevented",
              icon: "🌊",
            },
            {
              metric: "18.7M kg",
              description: "CO₂ emissions reduced",
              icon: "🌿",
            },
            {
              metric: "750K+",
              description: "Trees saved",
              icon: "🌳",
            },
          ].map((impact, index) => (
            <div key={index} className="p-6">
              <div className="text-5xl mb-4">{impact.icon}</div>
              <h3 className="text-3xl font-bold text-grooveo-primary-600 mb-2">{impact.metric}</h3>
              <p className="text-grooveo-neutral-600">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-grooveo-primary-600">Sustainable Materials</h2>
            <p className="mb-4 text-grooveo-neutral-700">
              We carefully select materials that minimize environmental impact without compromising on quality or
              performance. Our packaging solutions are made from:
            </p>
            <ul className="space-y-3">
              {[
                "Recycled paper and cardboard from responsibly managed forests",
                "Plant-based bioplastics derived from cornstarch and sugarcane",
                "Biodegradable materials that break down naturally",
                "Compostable alternatives to traditional plastic films",
                "Reclaimed ocean plastic for select product lines",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-grooveo-secondary-500 mr-2 mt-0.5" />
                  <span className="text-grooveo-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Sustainable materials used in Grooveo packaging"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Sustainability Goals</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {[
            {
              goal: "Carbon Neutral by 2025",
              description:
                "We're offsetting our carbon footprint and transitioning to renewable energy across all operations.",
              progress: 68,
            },
            {
              goal: "Zero Waste Production by 2026",
              description: "We're implementing circular systems to eliminate waste in our manufacturing processes.",
              progress: 42,
            },
            {
              goal: "100% Plastic-Free Alternatives by 2027",
              description: "We're developing innovative solutions to replace all plastic-based packaging materials.",
              progress: 55,
            },
          ].map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-grooveo-primary-600">{goal.goal}</h3>
                <span className="text-grooveo-secondary-600 font-medium">{goal.progress}% Complete</span>
              </div>
              <Progress value={goal.progress} className="h-2 bg-grooveo-primary-100" />
              <p className="text-grooveo-neutral-600">{goal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16 bg-white p-8 rounded-xl border border-grooveo-primary-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Certifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: "Cradle to Cradle Certified",
              logo: "/placeholder.svg?height=200&width=200",
              description: "Products designed for circular economy",
            },
            {
              name: "FSC Certified",
              logo: "/placeholder.svg?height=200&width=200",
              description: "Responsibly sourced forest materials",
            },
            {
              name: "B Corporation",
              logo: "/placeholder.svg?height=200&width=200",
              description: "Meeting highest standards of social and environmental performance",
            },
            {
              name: "Plastic Neutral Certified",
              logo: "/placeholder.svg?height=200&width=200",
              description: "Removing as much plastic from the environment as we use",
            },
          ].map((cert, index) => (
            <div key={index} className="text-center">
              <div className="relative h-24 mb-4 mx-auto w-24">
                <Image src={cert.logo || "/placeholder.svg"} alt={cert.name} fill className="object-contain" />
              </div>
              <h3 className="text-lg font-bold text-grooveo-primary-600 mb-1">{cert.name}</h3>
              <p className="text-sm text-grooveo-neutral-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Initiatives */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-grooveo-primary-700">Our Initiatives</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Ocean Plastic Recovery",
              description:
                "We partner with coastal communities to collect and recycle ocean-bound plastic waste, transforming it into new packaging solutions.",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              title: "Reforestation Program",
              description:
                "For every ton of paper we use, we plant 50 trees through our global reforestation partners, focusing on biodiversity hotspots.",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              title: "Packaging Take-Back Program",
              description:
                "Our closed-loop system allows customers to return used Grooveo packaging for proper recycling or composting.",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              title: "Sustainable Design Education",
              description:
                "We offer free workshops and resources to help businesses transition to more sustainable packaging solutions.",
              image: "/placeholder.svg?height=400&width=600",
            },
          ].map((initiative, index) => (
            <Card key={index} className="overflow-hidden border-grooveo-primary-200">
              <div className="relative h-48">
                <Image
                  src={initiative.image || "/placeholder.svg"}
                  alt={initiative.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-grooveo-primary-600">{initiative.title}</h3>
                <p className="text-grooveo-neutral-600">{initiative.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-grooveo-primary-600 text-black p-12 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Sustainability Journey</h2>
        <p className="max-w-2xl mx-auto mb-8 text-black">
          Every packaging choice makes a difference. Discover how Grooveo can help your business reduce its
          environmental footprint without compromising on quality or design.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link href="/products">Shop Sustainable Packaging</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent text-black border-black hover:bg-black hover:text-white"
          >
            <Link href="/impact">Calculate Your Impact</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
