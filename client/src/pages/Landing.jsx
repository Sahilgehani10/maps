'use client'

import React, { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const menuItems = [
  {
    name: 'Home',
    href: '',
  },
  {
    name: 'Reviews',
    href: 'test',
  },
  {
    name: 'Maps',
    href: 'maps',
  },
  {
    name: 'Weather',
    href: 'weather',
  },
]

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full">
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              Explore the Wonders of the World
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Discover breathtaking landscapes, vibrant cultures, and unforgettable experiences with us.
            </p>
            <form action="" className="mt-8 flex items-start space-x-2">
              <div>
                <input
                  className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                ></input>
                <p className="mt-2 text-sm text-gray-500">Subscribe to receive exclusive travel offers</p>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">

            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
              src="hero.jpg"
              alt=''
            />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-32 max-w-7xl px-2 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-9 w-9 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
            <p className="mt-4 text-sm text-gray-600">
              Your payments are secured with advanced encryption to ensure safe transactions.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <svg
                className="h-9 w-9 text-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Book</h3>
            <p className="mt-4 text-sm text-gray-600">
              Booking your dream vacation is just a few clicks away with our user-friendly platform.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-9 w-9 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Customizable Tours</h3>
            <p className="mt-4 text-sm text-gray-600">
              Tailor your itinerary to suit your preferences and create memories that last a lifetime.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-9 w-9 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Expert Guides</h3>
            <p className="mt-4 text-sm text-gray-600">
              Our knowledgeable guides will accompany you and ensure you have an enriching experience.
            </p>
          </div>
        </div>
      </div>
      {/* Call to Action Section */}
      <div className="bg-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black">
              Ready to start your adventure?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Book your trip today and embark on a journey to remember.
            </p>
            <div className="mt-8 space-x-4">
              <Link
                to="/booking"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus-visible:outline focus-visible:outline-black"
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-blue-600 rounded-md bg-blue-100 hover:bg-blue-200 focus-visible:outline focus-visible:outline-black"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
