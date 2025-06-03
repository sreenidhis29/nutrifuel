'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface Question {
    id: string;
    text: string;
    type: 'single' | 'multiple' | 'text' | 'number';
    options?: string[];
    placeholder?: string;
}

const questions: Question[] = [
    {
        id: 'goal',
        text: 'What is your primary fitness goal?',
        type: 'single',
        options: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Improve Fitness', 'Better Health'],
    },
    {
        id: 'activity_level',
        text: 'How active are you on a daily basis?',
        type: 'single',
        options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'],
    },
    {
        id: 'dietary_restrictions',
        text: 'Do you have any dietary restrictions?',
        type: 'multiple',
        options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Lactose Intolerant', 'None'],
    },
    {
        id: 'allergies',
        text: 'Do you have any food allergies?',
        type: 'text',
        placeholder: 'List any food allergies (e.g., nuts, shellfish) or type "none"',
    },
    {
        id: 'height',
        text: 'What is your height?',
        type: 'number',
        placeholder: 'Height in cm',
    },
    {
        id: 'weight',
        text: 'What is your current weight?',
        type: 'number',
        placeholder: 'Weight in kg',
    },
    {
        id: 'age',
        text: 'What is your age?',
        type: 'number',
        placeholder: 'Age in years',
    },
    {
        id: 'meals_per_day',
        text: 'How many meals do you prefer per day?',
        type: 'single',
        options: ['2', '3', '4', '5', '6'],
    },
    {
        id: 'cuisine_preference',
        text: 'What type of cuisine do you prefer?',
        type: 'multiple',
        options: ['Indian', 'Continental', 'Asian', 'Mediterranean', 'Mix of Everything'],
    },
    {
        id: 'cooking_time',
        text: 'How much time can you spend on meal preparation?',
        type: 'single',
        options: ['15-30 minutes', '30-45 minutes', '45-60 minutes', 'More than 60 minutes'],
    },
];

export default function OnboardingQuestionnaire() {
    const router = useRouter();
    const { isSignedIn, isLoaded } = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnswer = (answer: any) => {
        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestion].id]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!isSignedIn) {
            setError('Please sign in to continue');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Send the questionnaire answers to the API
            const response = await fetch('/api/generate-meal-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    preferences: answers,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate meal plan');
            }

            // Navigate to the meal plans page with the custom parameter
            router.push('/meal-plans?custom=true');
        } catch (error) {
            console.error('Error submitting questionnaire:', error);
            setError('Failed to generate meal plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-primary-100/20 py-12">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-100/20 py-12">
            <div className="mx-auto max-w-3xl px-6">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Question */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{currentQ.text}</h2>

                        {/* Answer Input */}
                        {currentQ.type === 'single' && currentQ.options && (
                            <div className="space-y-3">
                                {currentQ.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${answers[currentQ.id] === option
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-200 hover:border-primary-200'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.type === 'multiple' && currentQ.options && (
                            <div className="space-y-3">
                                {currentQ.options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-primary-200 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={answers[currentQ.id]?.includes(option)}
                                            onChange={(e) => {
                                                const currentAnswers = answers[currentQ.id] || [];
                                                handleAnswer(
                                                    e.target.checked
                                                        ? [...currentAnswers, option]
                                                        : currentAnswers.filter((a: string) => a !== option)
                                                );
                                            }}
                                            className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {currentQ.type === 'text' && (
                            <input
                                type="text"
                                value={answers[currentQ.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                placeholder={currentQ.placeholder}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                        )}

                        {currentQ.type === 'number' && (
                            <input
                                type="number"
                                value={answers[currentQ.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                placeholder={currentQ.placeholder}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={handleBack}
                            disabled={currentQuestion === 0 || loading}
                            className={`px-6 py-2 rounded-lg border ${currentQuestion === 0 || loading
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 text-gray-700 hover:border-primary-200'
                                }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!answers[currentQ.id] || loading}
                            className={`px-6 py-2 rounded-lg ${!answers[currentQ.id] || loading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-500'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Processing...
                                </span>
                            ) : currentQuestion === questions.length - 1 ? (
                                'Submit'
                            ) : (
                                'Next'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 