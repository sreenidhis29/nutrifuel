'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'chef' | 'nutritionist';
    status: 'active' | 'inactive';
}

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const [activeTab, setActiveTab] = useState<'users' | 'chefs' | 'nutritionists'>('users');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data - Replace with actual API calls
    const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
        { id: '2', name: 'Chef Smith', email: 'chef@example.com', role: 'chef', status: 'active' },
        { id: '3', name: 'Dr. Nutrition', email: 'nutrition@example.com', role: 'nutritionist', status: 'active' },
    ];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-primary-100/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Check if user is admin
    if (user?.publicMetadata?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-primary-100/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
                    <p className="mt-2 text-gray-600">You do not have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-100/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard 👨‍💼</h1>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8">
                            {(['users', 'chefs', 'nutritionists'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        {mockUsers
                            .filter((user) => user.role === activeTab.slice(0, -1))
                            .map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-primary-600 hover:text-primary-500">
                                            Edit ✏️
                                        </button>
                                        <button className="text-red-600 hover:text-red-500">
                                            Delete 🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 