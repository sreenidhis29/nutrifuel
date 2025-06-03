'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';

export default function HomePage() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      name: 'High Protein Content',
      description: 'Each meal is carefully crafted to provide optimal protein content for muscle growth and recovery.',
      emoji: '💪',
      gif: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
    },
    {
      name: 'Indian Cuisine',
      description: 'Enjoy authentic Indian flavors while maintaining your fitness goals with our specially curated recipes.',
      emoji: '🍛',
      gif: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
    },
    {
      name: 'Expert Nutritionists',
      description: 'Our team of certified nutritionists ensures that each meal plan is perfectly balanced for your goals.',
      emoji: '👩‍⚕️',
      gif: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <VideoBackground>
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                  <span className="block mb-4">Transform Your Health</span>
                  <span className="block text-primary-400 text-6xl md:text-8xl">With NutriFuel</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 leading-relaxed">
                  Enjoy authentic Indian flavors while maintaining your fitness goals with our specially curated recipes.
                </p>
                <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
                  <div className="rounded-md shadow">
                    <Link
                      href="/sign-up"
                      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-5 md:text-xl md:px-12 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <Link
                      href="/meal-plans"
                      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-5 md:text-xl md:px-12 transition-all duration-200"
                    >
                      View Meal Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VideoBackground>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-primary-600 tracking-wide uppercase">Premium Nutrition</h2>
          <p className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Everything you need to achieve your fitness goals
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Our expert nutritionists and chefs have crafted the perfect balance of taste and nutrition to help you reach your fitness goals faster.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-4 text-xl font-semibold leading-7 text-gray-900">
                  <span className="text-4xl">{feature.emoji}</span>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to transform your nutrition?
              <br />
              Start your journey today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-primary-100">
              Join thousands of fitness enthusiasts who have already transformed their lives with our premium meal plans.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/sign-up"
                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
              >
                Get Started
              </Link>
              <Link href="/pricing" className="text-lg font-semibold leading-6 text-white hover:text-primary-100 transition-colors duration-200">
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
