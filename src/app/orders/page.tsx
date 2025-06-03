'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export default function OrdersPage() {
    const { user } = useUser();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Implement order fetching logic with your preferred backend
        // This is a placeholder for demonstration
        const mockOrders: Order[] = [
            {
                id: '1',
                date: '2024-03-15',
                status: 'Delivered',
                total: 149.99,
                items: [
                    { name: 'Premium Meal Plan', quantity: 1, price: 149.99 }
                ]
            },
            {
                id: '2',
                date: '2024-03-01',
                status: 'Delivered',
                total: 149.99,
                items: [
                    { name: 'Premium Meal Plan', quantity: 1, price: 149.99 }
                ]
            }
        ];
        setOrders(mockOrders);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                                    <p className="text-gray-600">Placed on {order.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 