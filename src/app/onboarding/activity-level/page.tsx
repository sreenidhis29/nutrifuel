'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

const activityLevels = [
    'Sedentary',
    'Lightly active',
    'Active',
    'Very active'
];

export default function ActivityLevelPage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleNext = () => {
        if (selectedLevel) {
            router.push('/onboarding/goals');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-background-default py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center mb-8">
                <h1 className="text-3xl font-bold text-primary-main">Activity Level</h1>
                <p className="text-text-secondary mt-2">How active are you in your daily life?</p>
            </div>

            <div className="w-full max-w-md space-y-4 mb-8">
                {activityLevels.map((level) => (
                    <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`w-full p-4 rounded-lg border ${selectedLevel === level
                                ? 'border-primary-main bg-primary-50'
                                : 'border-gray-300 hover:border-primary-main'
                            }`}
                    >
                        <h3 className="font-medium text-left">{level}</h3>
                    </button>
                ))}
            </div>

            <div className="w-full max-w-md">
                <Button
                    onClick={handleNext}
                    fullWidth
                    disabled={!selectedLevel}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 