'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SubscriptionSuccessPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        // Simulate API call delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navigation />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    {loading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            <p className="mt-4 text-lg text-gray-600">Setting up your subscription...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <CheckCircleIcon className="h-16 w-16 text-primary-600" />
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Subscription Confirmed!
                            </h1>
                            <p className="mt-4 text-lg text-gray-600">
                                Thank you for subscribing to NutriFuel. Your meal plan will be ready shortly.
                            </p>

                            <div className="mt-8 space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Next Steps:</h2>
                                <ul className="space-y-3 text-left text-gray-600">
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                                        Check your email for a welcome message
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                                        Complete your dietary preferences in your profile
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                                        View your personalized meal plan in the dashboard
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-8 space-x-4">
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Go to Dashboard
                                </button>
                                <button
                                    onClick={() => router.push('/profile')}
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Complete Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 