'use client';

import { useState, useEffect, ReactNode } from 'react';

interface VideoBackgroundProps {
    className?: string;
    children: ReactNode;
}

export default function VideoBackground({ className = '', children }: VideoBackgroundProps) {
    const [videoError, setVideoError] = useState(false);

    return (
        <div className="relative min-h-screen">
            <div className={`absolute inset-0 overflow-hidden ${className}`}>
                {!videoError ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute min-w-full min-h-full object-cover"
                        onError={() => setVideoError(true)}
                    >
                        <source src="/media/home.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
                )}
                <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text readability */}
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
} 