import type { OrderItem } from "./orders"

// Carbon impact factors for different product categories (in kg CO2e saved per item)
const CARBON_IMPACT_FACTORS: Record<string, number> = {
  "Mailers & Envelopes": 0.35, // Compared to plastic mailers
  "Boxes & Containers": 0.85, // Compared to standard boxes
  "Tape & Adhesives": 0.12, // Compared to plastic tape
  "Void Fillers": 0.45, // Compared to plastic void fillers
  "Labels & Stickers": 0.08, // Compared to standard labels
  default: 0.25, // Default value for other categories
}

// Material-specific multipliers
const MATERIAL_MULTIPLIERS: Record<string, number> = {
  "Recycled Paper": 1.2,
  "Recycled Cardboard": 1.3,
  "Kraft Paper": 1.1,
  Cornstarch: 1.5,
  Bioplastic: 1.4,
  default: 1.0,
}

// Tags-specific multipliers
const TAG_MULTIPLIERS: Record<string, number> = {
  Biodegradable: 1.2,
  Compostable: 1.3,
  Recyclable: 1.1,
  "Plastic-Free": 1.25,
  "FSC Certified": 1.15,
  default: 1.0,
}

export interface CarbonImpact {
  carbonSaved: number // in kg CO2e
  treesEquivalent: number
  waterSaved: number // in liters
  plasticReduced: number // in grams
  carMilesEquivalent: number
}

export function calculateCarbonImpact(items: OrderItem[], productDetails: any[] = []): CarbonImpact {
  let totalCarbonSaved = 0

  items.forEach((item) => {
    // Find product details if available
    const details = productDetails.find((p) => p.id === item.id)

    // Get base carbon impact factor by category or use default
    const category = details?.category || "default"
    let carbonFactor = CARBON_IMPACT_FACTORS[category] || CARBON_IMPACT_FACTORS.default

    // Apply material multiplier if available
    const material = details?.material || "default"
    carbonFactor *= MATERIAL_MULTIPLIERS[material] || MATERIAL_MULTIPLIERS.default

    // Apply tag multipliers if available
    if (details?.tags && Array.isArray(details.tags)) {
      details.tags.forEach((tag) => {
        carbonFactor *= TAG_MULTIPLIERS[tag] || 1.0
      })
    }

    // Calculate carbon saved for this item based on quantity
    const itemCarbonSaved = carbonFactor * item.quantity
    totalCarbonSaved += itemCarbonSaved
  })

  // Calculate equivalent metrics
  const treesEquivalent = totalCarbonSaved * 0.12 // Each tree absorbs ~8.3kg CO2 per year
  const waterSaved = totalCarbonSaved * 380 // Liters of water saved
  const plasticReduced = totalCarbonSaved * 250 // Grams of plastic reduced
  const carMilesEquivalent = totalCarbonSaved * 2.5 // Miles of driving avoided

  return {
    carbonSaved: Number.parseFloat(totalCarbonSaved.toFixed(2)),
    treesEquivalent: Number.parseFloat(treesEquivalent.toFixed(1)),
    waterSaved: Math.round(waterSaved),
    plasticReduced: Math.round(plasticReduced),
    carMilesEquivalent: Math.round(carMilesEquivalent),
  }
}

// Helper function to get a random impact fact
export function getRandomImpactFact(impact: CarbonImpact): string {
  const facts = [
    `You've saved ${impact.carbonSaved} kg of CO2 emissions, equivalent to ${impact.carMilesEquivalent} miles of driving!`,
    `Your order helps save ${impact.waterSaved} liters of water, enough to fill ${Math.round(impact.waterSaved / 250)} bathtubs!`,
    `By choosing eco-friendly packaging, you've reduced plastic waste by ${impact.plasticReduced} grams!`,
    `Your environmental impact is equivalent to planting ${impact.treesEquivalent} trees!`,
    `You've helped reduce carbon emissions equivalent to charging a smartphone ${Math.round(impact.carbonSaved * 121)} times!`,
  ]

  return facts[Math.floor(Math.random() * facts.length)]
}
