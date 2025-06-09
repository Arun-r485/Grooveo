export interface ProductType {
  id: string
  name: string
  description: string
  price: number // Price in paise (1 INR = 100 paise)
  compareAtPrice?: number
  image?: string
  category: string
  material?: string
  tags?: string[]
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  weight?: number
  stockCount: number // Added stock count field
}

// Helper function to format price in INR
export const formatINR = (priceInPaise: number): string => {
  return `₹${(priceInPaise / 100).toFixed(2)}`
}

export const featuredProducts: ProductType[] = [
  {
    id: "eco-mailer-1",
    name: "Biodegradable Kraft Mailers",
    description:
      "Eco-friendly shipping mailers made from 100% recycled kraft paper. Perfect for e-commerce businesses looking to reduce their environmental impact.",
    price: 1078, // ₹10.78
    compareAtPrice: 1327, // ₹13.27
    image: "/images/kraft-mailers.png",
    category: "Mailers & Envelopes",
    material: "Recycled Paper",
    tags: ["Biodegradable", "Recyclable", "Plastic-Free"],
    dimensions: {
      width: 25,
      height: 35,
      depth: 1,
    },
    weight: 50,
    stockCount: 25, // Good stock
  },
  {
    id: "eco-box-1",
    name: "Corrugated Shipping Boxes",
    description:
      "Sturdy corrugated boxes made from 100% recycled materials. These boxes provide excellent protection while being environmentally responsible.",
    price: 2074, // ₹20.74
    image: "/images/corrugated-boxes.png",
    category: "Boxes & Containers",
    material: "Recycled Cardboard",
    tags: ["Recyclable", "FSC Certified", "Plastic-Free"],
    dimensions: {
      width: 30,
      height: 20,
      depth: 15,
    },
    weight: 200,
    stockCount: 3, // Low stock
  },
  {
    id: "eco-tape-1",
    name: "Paper Packaging Tape",
    description:
      "Water-activated paper tape that's 100% recyclable and biodegradable. Strong adhesion without the environmental impact of plastic tape.",
    price: 746, // ₹7.46
    compareAtPrice: 912, // ₹9.12
    image: "/images/paper-tape.png",
    category: "Tape & Adhesives",
    material: "Kraft Paper",
    tags: ["Biodegradable", "Recyclable", "Plastic-Free"],
    dimensions: {
      width: 5,
      height: 50,
      depth: 5,
    },
    weight: 100,
    stockCount: 0, // Out of stock
  },
]

export const allProducts: ProductType[] = [
  ...featuredProducts,
  {
    id: "eco-filler-1",
    name: "Compostable Packing Peanuts",
    description:
      "Plant-based packing peanuts that dissolve in water and are fully compostable. Perfect for protecting fragile items during shipping.",
    price: 1244, // ₹12.44
    image: "/images/packing-peanuts.png",
    category: "Void Fillers",
    material: "Cornstarch",
    tags: ["Compostable", "Biodegradable", "Plastic-Free"],
    dimensions: {
      width: 20,
      height: 30,
      depth: 20,
    },
    weight: 150,
    stockCount: 42, // Good stock
  },
  {
    id: "eco-wrap-1",
    name: "Honeycomb Paper Wrap",
    description:
      "Expandable paper wrap that provides excellent cushioning and protection for your products. A sustainable alternative to bubble wrap.",
    price: 1576, // ₹15.76
    image: "/images/honeycomb-wrap.png",
    category: "Void Fillers",
    material: "Recycled Paper",
    tags: ["Recyclable", "Plastic-Free", "FSC Certified"],
    dimensions: {
      width: 30,
      height: 5,
      depth: 30,
    },
    weight: 120,
    stockCount: 4, // Low stock
  },
  {
    id: "eco-bag-1",
    name: "Compostable Poly Mailers",
    description:
      "Plant-based poly mailers that are fully compostable and biodegradable. Waterproof and durable for secure shipping.",
    price: 1327, // ₹13.27
    compareAtPrice: 1659, // ₹16.59
    image: "/images/poly-mailers.png",
    category: "Mailers & Envelopes",
    material: "Bioplastic",
    tags: ["Compostable", "Biodegradable", "Waterproof"],
    dimensions: {
      width: 25,
      height: 35,
      depth: 0.5,
    },
    weight: 30,
    stockCount: 0, // Out of stock
  },
  {
    id: "eco-tissue-1",
    name: "Recycled Tissue Paper",
    description:
      "Soft tissue paper made from 100% recycled materials. Perfect for wrapping products and creating an eco-friendly unboxing experience.",
    price: 580, // ₹5.80
    image: "/images/tissue-paper.png",
    category: "Void Fillers",
    material: "Recycled Paper",
    tags: ["Recyclable", "FSC Certified", "Plastic-Free"],
    dimensions: {
      width: 50,
      height: 70,
      depth: 0.1,
    },
    weight: 80,
    stockCount: 15, // Good stock
  },
  {
    id: "eco-box-2",
    name: "Kraft Gift Boxes",
    description:
      "Elegant kraft gift boxes made from recycled materials. Perfect for retail packaging or subscription boxes.",
    price: 1659, // ₹16.59
    image: "/images/gift-boxes.png",
    category: "Boxes & Containers",
    material: "Recycled Cardboard",
    tags: ["Recyclable", "FSC Certified", "Plastic-Free"],
    dimensions: {
      width: 20,
      height: 10,
      depth: 5,
    },
    weight: 150,
    stockCount: 2, // Low stock
  },
  {
    id: "eco-label-1",
    name: "Compostable Shipping Labels",
    description:
      "Eco-friendly shipping labels made from plant-based materials. Compatible with standard thermal printers.",
    price: 829, // ₹8.29
    image: "/images/shipping-labels.png",
    category: "Labels & Stickers",
    material: "Bioplastic",
    tags: ["Compostable", "Biodegradable"],
    dimensions: {
      width: 10,
      height: 15,
      depth: 0.1,
    },
    weight: 20,
    stockCount: 8, // Good stock
  },
]
