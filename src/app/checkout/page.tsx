'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const plans = {
    'tier-basic': {
        name: 'Basic Plan',
        price: { monthly: 49, yearly: 490 },
        features: [
            '3 meals per day',
            'Basic protein content',
            'Standard Indian cuisine',
            'Weekly meal rotation',
        ],
    },
    'tier-pro': {
        name: 'Pro Plan',
        price: { monthly: 79, yearly: 790 },
        features: [
            '4 meals per day',
            'High protein content',
            'Premium Indian cuisine',
            'Customizable meal plans',
            'Priority support',
        ],
    },
    'tier-elite': {
        name: 'Elite Plan',
        price: { monthly: 129, yearly: 1290 },
        features: [
            '5 meals per day',
            'Maximum protein content',
            'Premium Indian cuisine',
            'Fully customizable meal plans',
            '24/7 priority support',
            'Weekly consultations',
        ],
    },
};

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const planId = searchParams.get('plan');
    const cycle = searchParams.get('cycle') as 'monthly' | 'yearly';

    if (!user) {
        router.push('/login');
        return null;
    }

    if (!planId || !cycle || !plans[planId as keyof typeof plans]) {
        router.push('/pricing');
        return null;
    }

    const selectedPlan = plans[planId as keyof typeof plans];
    const price = selectedPlan.price[cycle];

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate successful payment
            const success = Math.random() > 0.1; // 90% success rate

            if (success) {
                router.push('/subscription/success');
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Complete your subscription
                    </h1>

                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        {/* Order summary */}
                        <div className="lg:col-span-7">
                            <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Plan</dt>
                                        <dd className="text-sm font-medium text-gray-900">{selectedPlan.name}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Billing cycle</dt>
                                        <dd className="text-sm font-medium text-gray-900 capitalize">{cycle}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Total</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            ${price}/{cycle === 'monthly' ? 'month' : 'year'}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-900">Features included:</h3>
                                    <ul className="mt-4 space-y-2">
                                        {selectedPlan.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="h-5 w-5 text-primary-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Payment form */}
                        <div className="mt-12 lg:col-span-5 lg:mt-0">
                            <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                                <div className="mt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                id="card-number"
                                                placeholder="4242 4242 4242 4242"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expiry"
                                                    placeholder="MM/YY"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                                                    CVC
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cvc"
                                                    placeholder="123"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="rounded-md bg-red-50 p-4">
                                                <div className="flex">
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                                                        <div className="mt-2 text-sm text-red-700">{error}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handlePayment}
                                            disabled={loading}
                                            className={`w-full rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600'
                                                }`}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                `Subscribe ${cycle === 'monthly' ? 'Monthly' : 'Yearly'}`
                                            )}
                                        </button>

                                        <p className="text-xs text-gray-500 text-center">
                                            This is a demo payment system. No real payments will be processed.
                                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 