'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Meal Plans', href: '/meal-plans' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
];

const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
];

export default function Navigation() {
    const { isSignedIn } = useUser();
    const navigation = isSignedIn ? authenticatedNavigation : publicNavigation;

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={isSignedIn ? "/dashboard" : "/"} className="text-3xl font-bold text-primary-600">
                                        NutriFuel
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700 transition-colors duration-200"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {isSignedIn ? (
                                    <div className="flex items-center space-x-4">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-6">
                                        <SignInButton mode="modal">
                                            <button className="text-base font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                                Sign in
                                            </button>
                                        </SignInButton>
                                        <SignInButton mode="modal">
                                            <button className="rounded-md bg-primary-600 px-5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition-all duration-200">
                                                Get Started
                                            </button>
                                        </SignInButton>
                                    </div>
                                )}
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    className="block border-l-4 border-transparent py-3 pl-3 pr-4 text-lg font-medium text-gray-500 hover:border-primary-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            {isSignedIn ? (
                                <div className="space-y-1">
                                    <div className="px-4">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <SignInButton mode="modal">
                                        <button className="block w-full px-4 py-3 text-left text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
                                            Sign in
                                        </button>
                                    </SignInButton>
                                    <SignInButton mode="modal">
                                        <button className="block w-full px-4 py-3 text-left text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
                                            Get Started
                                        </button>
                                    </SignInButton>
                                </div>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
} 