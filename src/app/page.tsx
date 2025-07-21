"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 font-mono">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: { duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-white">DayPlanner</div>
          <div className="flex space-x-6">
            <Link href="/login" className="text-indigo-200 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-indigo-200 hover:text-white transition-colors">
              Register
            </Link>
          </div>
        </nav>

        {/* Hero section */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Plan Your Perfect Day
          </motion.h1>

          <motion.p
            className="text-xl text-indigo-200 max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover, organize, and optimize your daily adventures with our intelligent planning tool.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/dashboard"
              className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </main>

        {/* Features grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 max-w-6xl mx-auto">
          {[
            {
              title: "Smart Suggestions",
              description: "AI-powered recommendations based on your preferences",
              icon: "💡"
            },
            {
              title: "Time Optimization",
              description: "Automatically plan the most efficient route",
              icon: "⏱️"
            },
            {
              title: "Personalized Itineraries",
              description: "Save and share your perfect day plans",
              icon: "📝"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-indigo-200">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  )
}