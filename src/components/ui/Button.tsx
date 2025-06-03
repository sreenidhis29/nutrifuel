'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css'; // Import CSS module

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    fullWidth?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    // Use CSS module classes instead of Tailwind classes
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className, // Allow passing additional classes
    ].filter(Boolean).join(' ');

    return (
        <button
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    );
} 