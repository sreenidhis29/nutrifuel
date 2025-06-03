'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function AboutYourselfPage() {
    const router = useRouter();
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');

    const handleNext = () => {
        // Basic validation (can be improved)
        if (gender && age && weight && height) {
            // Save data to state/context if needed
            router.push('/onboarding/dietary-preference');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Save data to state/context if needed
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

            <div className="w-full max-w-md space-y-4 mb-8">
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-text-primary">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other' | '')}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-main focus:outline-none focus:ring-1 focus:ring-primary-main"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-text-primary">Age</label>
                    <input
                        id="age"
                        type="number"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-main focus:outline-none focus:ring-1 focus:ring-primary-main"
                    />
                </div>

                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-text-primary">Weight (lbs)</label>
                    <input
                        id="weight"
                        type="number"
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-main focus:outline-none focus:ring-1 focus:ring-primary-main"
                    />
                </div>

                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-text-primary">Height (ft in)</label>
                    {/* This input could be improved for better UX with separate ft/in fields */}
                    <input
                        id="height"
                        type="text"
                        required
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 5 ft 6 in"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-main focus:outline-none focus:ring-1 focus:ring-primary-main"
                    />
                </div>
            </div>

            <div className="w-full max-w-md">
                <Button
                    onClick={handleNext}
                    fullWidth
                    disabled={!gender || !age || !weight || !height}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 