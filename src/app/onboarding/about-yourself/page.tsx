'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function AboutYourselfPage() {
    const { user } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        activityLevel: '',
        goals: '',
        dietaryRestrictions: '',
        allergies: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/sign-in');
            return;
        }

        try {
            // TODO: Implement form submission logic with your preferred backend
            console.log('Form data:', formData);
            router.push('/onboarding/meal-preferences');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-background-default py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center mb-8">
                <Image
                    src="/logo.png"
                    alt="NutriFuel Logo"
                    width={80}
                    height={80}
                    className="mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-primary-main">Tell Us About Yourself</h1>
            </div>

            <div className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                                Activity Level
                            </label>
                            <select
                                id="activityLevel"
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select activity level</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Lightly Active</option>
                                <option value="moderate">Moderately Active</option>
                                <option value="very">Very Active</option>
                                <option value="extra">Extra Active</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                                Goals
                            </label>
                            <select
                                id="goals"
                                name="goals"
                                value={formData.goals}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select goal</option>
                                <option value="weight-loss">Weight Loss</option>
                                <option value="muscle-gain">Muscle Gain</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="general-health">General Health</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                            Dietary Restrictions
                        </label>
                        <textarea
                            id="dietaryRestrictions"
                            name="dietaryRestrictions"
                            value={formData.dietaryRestrictions}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            rows={3}
                            placeholder="e.g., Vegetarian, Vegan, etc."
                        />
                    </div>

                    <div>
                        <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                            Allergies
                        </label>
                        <textarea
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            rows={3}
                            placeholder="List any food allergies or intolerances"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 