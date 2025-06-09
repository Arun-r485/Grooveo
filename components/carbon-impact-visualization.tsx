"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Leaf, Droplets, TreePine, Car, Recycle } from "lucide-react"
import type { CarbonImpact } from "@/lib/carbon-impact"
import { getRandomImpactFact } from "@/lib/carbon-impact"

interface CarbonImpactVisualizationProps {
  impact: CarbonImpact
  className?: string
}

export function CarbonImpactVisualization({ impact, className = "" }: CarbonImpactVisualizationProps) {
  const [currentFact, setCurrentFact] = useState(getRandomImpactFact(impact))

  const refreshFact = () => {
    setCurrentFact(getRandomImpactFact(impact))
  }

  return (
    <div className={`bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
        <Leaf className="mr-2 h-5 w-5 text-teal-600" />
        Your Environmental Impact
      </h3>

      <div className="mb-6">
        <motion.p
          key={currentFact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-teal-700 italic bg-white bg-opacity-50 p-3 rounded-lg border border-teal-100"
        >
          "{currentFact}"
        </motion.p>
        <button onClick={refreshFact} className="text-xs text-teal-600 mt-2 hover:text-teal-800 transition-colors">
          Show another fact
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Leaf className="h-6 w-6 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{impact.carbonSaved}</div>
          <div className="text-xs text-teal-600">kg CO₂ saved</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <TreePine className="h-6 w-6 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{impact.treesEquivalent}</div>
          <div className="text-xs text-teal-600">trees equivalent</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Droplets className="h-6 w-6 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{impact.waterSaved}</div>
          <div className="text-xs text-teal-600">liters of water saved</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Recycle className="h-6 w-6 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{impact.plasticReduced}</div>
          <div className="text-xs text-teal-600">g plastic reduced</div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Car className="h-5 w-5 text-teal-600 mr-2" />
          <span className="text-sm text-teal-700">Driving equivalent saved</span>
        </div>
        <div className="font-bold text-teal-700">{impact.carMilesEquivalent} miles</div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-teal-600">
          Thank you for choosing eco-friendly packaging and making a positive impact on our planet!
        </p>
      </div>
    </div>
  )
}
