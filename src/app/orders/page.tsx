'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '@/context/FirebaseContext';
import { Order, MealPlan } from '@/types';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function OrdersPage() {
    const { auth, db } = useFirebase();
    const [orders, setOrders] = useState<Order[]>([]);
    const [mealPlans, setMealPlans] = useState<Record<string, MealPlan>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!auth.currentUser) return;

            try {
                // Fetch orders
                const ordersRef = collection(db, 'orders');
                const q = query(
                    ordersRef,
                    where('userId', '==', auth.currentUser.uid),
                    orderBy('deliveryDate', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Order[];
                setOrders(ordersData);

                // Fetch meal plans for order items
                const mealPlansRef = collection(db, 'mealPlans');
                const mealPlansSnapshot = await getDocs(mealPlansRef);
                const mealPlansData = mealPlansSnapshot.docs.reduce((acc, doc) => ({
                    ...acc,
                    [doc.id]: { id: doc.id, ...doc.data() }
                }), {});
                setMealPlans(mealPlansData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [auth.currentUser, db]);

    const formatDeliveryDate = (timestamp: Timestamp) => {
        const date = timestamp.toDate();
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
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <h3 className="text-lg font-semibold mb-4">Order #{order.id.slice(-6)}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {/* Order Summary (Left Side) */}
                                <div className="flex flex-col items-center md:items-start">
                                    {order.items.map((item) => {
                                        const mealPlan = mealPlans[item.mealPlanId];
                                        return ( // Assuming only one item per order for simplified display based on design
                                            mealPlan && (
                                                <div key={item.mealPlanId} className="flex flex-col items-center">
                                                    <Image
                                                        src={mealPlan.imageUrl}
                                                        alt={mealPlan.name}
                                                        width={200} // Adjust size as needed
                                                        height={150} // Adjust size as needed
                                                        className="object-cover rounded-md mb-4"
                                                    />
                                                    {order.status === 'delivered' && (
                                                        <div className="text-center md:text-left mb-4">
                                                            <p className="text-text-secondary text-sm">Delivered</p>
                                                            <p className="font-semibold text-primary-main text-lg">
                                                                {formatDeliveryDate(order.deliveryDate)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        );
                                    })}
                                    {order.status !== 'delivered' && (
                                        <div className="text-center md:text-left mb-4">
                                            <p className="text-text-secondary text-sm">Estimated Delivery</p>
                                            {/* Assuming deliveryDate holds the estimated delivery time until delivered */}
                                            <p className="font-semibold text-primary-main text-lg">
                                                {formatDeliveryDate(order.deliveryDate)}
                                            </p>
                                        </div>
                                    )}
                                    <Button variant="secondary" fullWidth>Contact</Button>
                                </div>

                                {/* Status Timeline (Right Side) */}
                                <div className="flex flex-col items-start w-full">
                                    {getStatusTimeline(order.status).map((step, index) => (
                                        <div key={index} className="flex items-center w-full">
                                            <div className="flex flex-col items-center mr-4">
                                                <div className={`w-4 h-4 rounded-full ${step.isCompleted ? 'bg-primary-main' : 'bg-gray-300'}`}></div>
                                                {index < getStatusTimeline(order.status).length - 1 && (
                                                    <div className={`w-0.5 h-10 ${step.isCompleted ? 'bg-primary-main' : 'bg-gray-300'}`}></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${step.isCurrent ? 'text-primary-main' : 'text-text-primary'}`}>{step.label}</p>
                                                {step.isCurrent && (
                                                    <p className="text-sm text-text-secondary">{/* Optional: Add time if available */}</p>
                                                )}
                                                {step.label === 'Delivered' && step.isCompleted && ( // Display delivered time only on the Delivered step if completed
                                                    <p className="text-sm text-text-secondary">{formatDeliveryDate(order.deliveryDate)}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

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