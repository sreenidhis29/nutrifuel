'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    UserCircleIcon,
    TruckIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Overview', href: '#', icon: ChartBarIcon, current: true },
    { name: 'Meal Plan', href: '#', icon: CalendarIcon, current: false },
    { name: 'Progress', href: '#', icon: ClockIcon, current: false },
    { name: 'Order Tracking', href: '#', icon: TruckIcon, current: false },
    { name: 'Chef & Nutritionist', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
];

const mealPlan = {
    today: [
        {
            name: 'High Protein Breakfast Bowl',
            calories: 450,
            protein: 35,
            time: '8:00 AM',
            emoji: '🍳',
        },
        {
            name: 'Grilled Chicken Salad',
            calories: 550,
            protein: 45,
            time: '12:30 PM',
            emoji: '🥗',
        },
        {
            name: 'Protein Rich Dinner',
            calories: 650,
            protein: 50,
            time: '7:00 PM',
            emoji: '🍖',
        },
    ],
};

// Sample nutrition data for the week
const weeklyNutrition = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    calories: [2100, 1950, 2200, 2050, 2150, 1900, 2000],
    protein: [120, 115, 125, 118, 122, 110, 118],
    carbs: [250, 230, 260, 240, 255, 220, 235],
    fat: [70, 65, 75, 68, 72, 63, 68],
};

// Sample order tracking data
const orderTracking = [
    {
        id: 'ORD001',
        date: '2024-03-20',
        status: 'Delivered',
        meals: ['Breakfast Bowl', 'Lunch Box', 'Dinner Plate'],
        deliveryTime: '7:30 AM',
        driver: 'Rahul Kumar',
        contact: '+91 98765 43210',
    },
    {
        id: 'ORD002',
        date: '2024-03-21',
        status: 'In Transit',
        meals: ['Breakfast Bowl', 'Lunch Box', 'Dinner Plate'],
        deliveryTime: '7:45 AM',
        driver: 'Amit Singh',
        contact: '+91 98765 43211',
    },
];

// Sample chef and nutritionist data
const assignedExperts = {
    chef: {
        name: 'Chef Rajesh Kumar',
        specialization: 'Healthy Indian Cuisine',
        experience: '15+ years',
        contact: '+91 98765 43212',
        email: 'rajesh.kumar@nutrifuel.com',
        availability: 'Mon-Sat, 9 AM - 6 PM',
    },
    nutritionist: {
        name: 'Dr. Sarah Sharma',
        specialization: 'Sports Nutrition',
        experience: '10+ years',
        contact: '+91 98765 43213',
        email: 'sarah.sharma@nutrifuel.com',
        availability: 'Mon-Fri, 10 AM - 7 PM',
    },
};

export default function Dashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('Overview');

    // Redirect if not logged in
    if (isLoaded && !user) {
        router.push('/');
        return null;
    }

    // Show loading state while Clerk is loading
    if (!isLoaded) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-900">
                            Dashboard 🎯
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Navigation Tabs */}
                        <div className="mt-8">
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="tabs"
                                    name="tabs"
                                    className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                                    value={selectedTab}
                                    onChange={(e) => setSelectedTab(e.target.value)}
                                >
                                    {navigation.map((tab) => (
                                        <option key={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                        {navigation.map((tab) => (
                                            <button
                                                key={tab.name}
                                                onClick={() => setSelectedTab(tab.name)}
                                                className={`
                          ${selectedTab === tab.name
                                                        ? 'border-primary-500 text-primary-600'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                                    }
                          flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                        `}
                                            >
                                                <tab.icon
                                                    className={`
                            ${selectedTab === tab.name ? 'text-primary-500' : 'text-gray-400'
                                                        }
                            -ml-0.5 mr-2 h-5 w-5
                          `}
                                                    aria-hidden="true"
                                                />
                                                {tab.name}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mt-8">
                            {selectedTab === 'Overview' && (
                                <div className="space-y-6">
                                    {/* Today's Meal Plan */}
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Today's Meal Plan 🍽️</h3>
                                            <div className="mt-5">
                                                <div className="space-y-4">
                                                    {mealPlan.today.map((meal) => (
                                                        <div
                                                            key={meal.name}
                                                            className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4"
                                                        >
                                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center text-4xl">
                                                                {meal.emoji}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-sm font-medium text-gray-900">{meal.name}</h4>
                                                                <p className="text-sm text-gray-500">{meal.time}</p>
                                                                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                                                    <span>{meal.calories} calories</span>
                                                                    <span>•</span>
                                                                    <span>{meal.protein}g protein</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Weekly Nutrition Tracker */}
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Weekly Nutrition Tracker 📊</h3>
                                            <div className="mt-5">
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                        <dt className="truncate text-sm font-medium text-gray-500">Average Calories 🔥</dt>
                                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                                            {Math.round(weeklyNutrition.calories.reduce((a, b) => a + b, 0) / 7)}
                                                        </dd>
                                                    </div>
                                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                        <dt className="truncate text-sm font-medium text-gray-500">Average Protein 💪</dt>
                                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                                            {Math.round(weeklyNutrition.protein.reduce((a, b) => a + b, 0) / 7)}g
                                                        </dd>
                                                    </div>
                                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                        <dt className="truncate text-sm font-medium text-gray-500">Average Carbs 🌾</dt>
                                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                                            {Math.round(weeklyNutrition.carbs.reduce((a, b) => a + b, 0) / 7)}g
                                                        </dd>
                                                    </div>
                                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                        <dt className="truncate text-sm font-medium text-gray-500">Average Fat 🥑</dt>
                                                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                                            {Math.round(weeklyNutrition.fat.reduce((a, b) => a + b, 0) / 7)}g
                                                        </dd>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'Order Tracking' && (
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Order Tracking 📦</h3>
                                        <div className="mt-5">
                                            <div className="space-y-6">
                                                {orderTracking.map((order) => (
                                                    <div key={order.id} className="border rounded-lg p-6">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-lg font-medium text-gray-900">Order #{order.id} 🛒</h4>
                                                                <p className="text-sm text-gray-500">{order.date}</p>
                                                            </div>
                                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {order.status === 'Delivered' ? '✅ Delivered' : '🚚 In Transit'}
                                                            </span>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h5 className="text-sm font-medium text-gray-900">Meals 🍱</h5>
                                                            <ul className="mt-2 space-y-1">
                                                                {order.meals.map((meal) => (
                                                                    <li key={meal} className="text-sm text-gray-600">{meal}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h5 className="text-sm font-medium text-gray-900">Delivery Details 🚚</h5>
                                                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                                <p>⏰ Delivery Time: {order.deliveryTime}</p>
                                                                <p>👤 Driver: {order.driver}</p>
                                                                <p>📞 Contact: {order.contact}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'Chef & Nutritionist' && (
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Your Assigned Experts 👨‍🍳👩‍⚕️</h3>
                                        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            {/* Chef Card */}
                                            <div className="border rounded-lg p-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                                                        👨‍🍳
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-medium text-gray-900">{assignedExperts.chef.name}</h4>
                                                        <p className="text-sm text-gray-500">{assignedExperts.chef.specialization}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 space-y-2 text-sm text-gray-600">
                                                    <p>⭐ Experience: {assignedExperts.chef.experience}</p>
                                                    <p>📞 Contact: {assignedExperts.chef.contact}</p>
                                                    <p>📧 Email: {assignedExperts.chef.email}</p>
                                                    <p>⏰ Availability: {assignedExperts.chef.availability}</p>
                                                </div>
                                            </div>

                                            {/* Nutritionist Card */}
                                            <div className="border rounded-lg p-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                                                        👩‍⚕️
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-medium text-gray-900">{assignedExperts.nutritionist.name}</h4>
                                                        <p className="text-sm text-gray-500">{assignedExperts.nutritionist.specialization}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 space-y-2 text-sm text-gray-600">
                                                    <p>⭐ Experience: {assignedExperts.nutritionist.experience}</p>
                                                    <p>📞 Contact: {assignedExperts.nutritionist.contact}</p>
                                                    <p>📧 Email: {assignedExperts.nutritionist.email}</p>
                                                    <p>⏰ Availability: {assignedExperts.nutritionist.availability}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'Meal Plan' && (
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Weekly Meal Plan 📅</h3>
                                        <div className="mt-5">
                                            {/* Add weekly meal plan content */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'Progress' && (
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Progress Tracking 📈</h3>
                                        <div className="mt-5">
                                            {/* Add progress tracking content */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedTab === 'Profile' && (
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Settings 👤</h3>
                                        <div className="mt-5">
                                            {/* Add profile settings content */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 