"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { authenticateWithGoogle } from "@/app/actions/google-auth"

export interface User {
  id: string
  email: string
  name: string
  picture?: string
  address?: {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
  preferences?: {
    marketingEmails: boolean
    orderUpdates: boolean
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would validate credentials with a backend
      // For demo purposes, we'll check against a mock user
      if (email === "demo@example.com" && password === "password") {
        const user: User = {
          id: "user_1",
          email: "demo@example.com",
          name: "Demo User",
          address: {
            street: "123 Eco Street",
            city: "Green City",
            state: "Nature State",
            postalCode: "12345",
            country: "USA",
          },
          preferences: {
            marketingEmails: true,
            orderUpdates: true,
          },
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return
      }

      // Check if the user exists in localStorage (for newly registered users)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return
      }

      throw new Error("Invalid email or password")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Google login function
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Generate a random state parameter to prevent CSRF attacks
      const state = Math.random().toString(36).substring(2, 15)

      // In a real implementation, this would redirect to Google's OAuth page
      // For demo purposes, we'll simulate the authentication flow
      const googleUser = await authenticateWithGoogle(state)

      // Create a user object from the Google user data
      const user: User = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        preferences: {
          marketingEmails: false,
          orderUpdates: true,
        },
      }

      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would register the user with a backend
      // For demo purposes, we'll store the user in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, you would never store passwords in plain text
        preferences: {
          marketingEmails: false,
          orderUpdates: true,
        },
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Log the user in
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user in state and localStorage
      const updatedUser = { ...user, ...userData } as User
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Also update in the users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => {
        if (u.id === updatedUser.id) {
          return { ...u, ...userData }
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
