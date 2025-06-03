'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface Order {
    id: string;
    status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';
    deliveryDate: Date;
    items: Array<{
        mealPlanId: string;
        name: string;
        imageUrl: string;
    }>;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const formatDeliveryDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric' };
        return `${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    const getStatusTimeline = (currentStatus: Order['status']) => {
        const statuses = ['pending', 'preparing', 'out_for_delivery', 'delivered'];
        const currentIndex = statuses.indexOf(currentStatus);

        return statuses.map((status, index) => ({
            label: status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
            isCompleted: index <= currentIndex,
            isCurrent: index === currentIndex,
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-primary-main">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-default py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary-main mb-4">
                        Order Tracking
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Track your meal deliveries
                    </p>
                </div>

                <div className="space-y-6">
                    {orders.length === 0 && !loading && (
                        <div className="text-center py-12 text-text-secondary">
                            You haven't placed any orders yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 