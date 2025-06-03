'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

interface Meal {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    price: number;
}

export default function MealsPage() {
    const { user } = useUser();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Implement meal fetching logic with your preferred backend
        // This is a placeholder for demonstration
        const mockMeals: Meal[] = [
            {
                id: '1',
                name: 'Grilled Chicken Bowl',
                description: 'Grilled chicken breast with quinoa, roasted vegetables, and avocado',
                imageUrl: '/images/meals/chicken-bowl.jpg',
                calories: 450,
                protein: 35,
                carbs: 40,
                fat: 15,
                price: 12.99
            },
            {
                id: '2',
                name: 'Salmon with Sweet Potato',
                description: 'Baked salmon with roasted sweet potato and steamed broccoli',
                imageUrl: '/images/meals/salmon.jpg',
                calories: 550,
                protein: 40,
                carbs: 45,
                fat: 20,
                price: 14.99
            }
        ];
        setMeals(mockMeals);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Our Meals</h1>
                <p>Loading meals...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Meals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                    <div key={meal.id} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="relative h-48">
                            <Image
                                src={meal.imageUrl}
                                alt={meal.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{meal.name}</h2>
                            <p className="text-gray-600 mb-4">{meal.description}</p>
                            <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Calories</p>
                                    <p className="font-semibold">{meal.calories}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Protein</p>
                                    <p className="font-semibold">{meal.protein}g</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Carbs</p>
                                    <p className="font-semibold">{meal.carbs}g</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Fat</p>
                                    <p className="font-semibold">{meal.fat}g</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">${meal.price.toFixed(2)}</span>
                                <button
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                                    onClick={() => {
                                        // TODO: Implement add to cart functionality
                                        console.log('Add to cart:', meal.id);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 