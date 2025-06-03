'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface MealPlan {
    id: string;
    name: string;
    description: string;
    type: 'ai' | 'predefined';
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meals: {
        name: string;
        time: string;
        description: string;
        calories: number;
    }[];
    tags: string[];
}

// Predefined meal plans
const predefinedPlans: MealPlan[] = [
    {
        id: 'weight-loss',
        name: 'Weight Loss Plan',
        description: 'A balanced meal plan designed for sustainable weight loss',
        type: 'predefined',
        calories: 1800,
        protein: 120,
        carbs: 180,
        fat: 60,
        meals: [
            {
                name: 'Breakfast',
                time: '8:00 AM',
                description: 'Oatmeal with berries and nuts',
                calories: 400,
            },
            {
                name: 'Lunch',
                time: '1:00 PM',
                description: 'Grilled chicken salad with vegetables',
                calories: 500,
            },
            {
                name: 'Dinner',
                time: '7:00 PM',
                description: 'Baked fish with quinoa and steamed vegetables',
                calories: 600,
            },
        ],
        tags: ['Weight Loss', 'Balanced', 'High Protein'],
    },
    // Add more predefined plans here
];

// Simulated AI-generated plan (in reality, this would come from your AI service)
const aiGeneratedPlan: MealPlan = {
    id: 'ai-custom',
    name: 'Your Personalized Plan',
    description: 'A custom meal plan tailored to your preferences and goals',
    type: 'ai',
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 70,
    meals: [
        {
            name: 'Breakfast',
            time: '8:00 AM',
            description: 'Protein smoothie with fruits and nuts',
            calories: 450,
        },
        {
            name: 'Lunch',
            time: '1:00 PM',
            description: 'Quinoa bowl with roasted vegetables and tofu',
            calories: 550,
        },
        {
            name: 'Dinner',
            time: '7:00 PM',
            description: 'Grilled salmon with sweet potato and asparagus',
            calories: 650,
        },
    ],
    tags: ['Custom', 'AI-Generated', 'Balanced'],
};

export default function MealPlansPage() {
    const searchParams = useSearchParams();
    const isCustom = searchParams.get('custom') === 'true';
    const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
    const [plans, setPlans] = useState<MealPlan[]>([]);

    useEffect(() => {
        // In a real application, you would fetch the AI-generated plan from your backend
        if (isCustom) {
            setPlans([aiGeneratedPlan, ...predefinedPlans]);
        } else {
            setPlans(predefinedPlans);
        }
    }, [isCustom]);

    return (
        <div className="min-h-screen bg-white">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {isCustom ? 'Your Personalized Meal Plans' : 'Available Meal Plans'}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {isCustom
                            ? 'Choose between your AI-generated plan or explore our predefined options'
                            : 'Browse our selection of nutritionally balanced meal plans'}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all ${selectedPlan?.id === plan.id
                                ? 'border-primary-600'
                                : 'border-transparent hover:border-primary-200'
                                }`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {plan.name}
                                    </h3>
                                    {plan.type === 'ai' && (
                                        <span className="px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                                            AI Generated
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-4">{plan.description}</p>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Calories</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {plan.calories}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Protein</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {plan.protein}g
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Carbs</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {plan.carbs}g
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {plan.meals.map((meal) => (
                                        <div
                                            key={meal.name}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {meal.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {meal.time}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {meal.calories} cal
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {plan.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${selectedPlan?.id === plan.id
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                                        }`}
                                >
                                    {selectedPlan?.id === plan.id
                                        ? 'Selected'
                                        : 'Select Plan'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPlan && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => {
                                // Handle plan selection and proceed to checkout
                                console.log('Selected plan:', selectedPlan);
                            }}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Proceed with Selected Plan
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
} 