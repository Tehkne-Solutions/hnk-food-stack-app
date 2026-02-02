/**
 * EmbersAnimation Component - Industrial-Ember Design System
 * Floating ember particles with fire animation effects
 */

'use client';

import { useEffect, useState } from 'react';

interface Ember {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

interface EmbersAnimationProps {
    count?: number;
    intensity?: 'low' | 'medium' | 'high';
    color?: 'amber' | 'orange' | 'red';
    className?: string;
}

export function EmbersAnimation({
    count = 12,
    intensity = 'medium',
    color = 'amber',
    className = '',
}: EmbersAnimationProps) {
    const [embers, setEmbers] = useState<Ember[]>([]);

    useEffect(() => {
        const generateEmbers = () => {
            const newEmbers: Ember[] = [];
            const intensityMap = { low: 2, medium: 2.5, high: 3 };
            const baseDuration = intensityMap[intensity];

            for (let i = 0; i < count; i++) {
                newEmbers.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 2,
                    duration: baseDuration + Math.random() * 2,
                    delay: Math.random() * 2,
                });
            }
            setEmbers(newEmbers);
        };

        generateEmbers();
    }, [count, intensity]);

    const colorMap = {
        amber: 'from-amber-400 to-amber-600',
        orange: 'from-orange-400 to-orange-600',
        red: 'from-red-400 to-red-600',
    };

    return (
        <div
            className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-900/10 via-transparent to-transparent" />

            {/* Embers */}
            {embers.map((ember) => (
                <div
                    key={ember.id}
                    className={`absolute rounded-full bg-gradient-to-br ${colorMap[color]} blur-sm opacity-60`}
                    style={{
                        width: `${ember.size}px`,
                        height: `${ember.size}px`,
                        left: `${ember.x}%`,
                        top: `${ember.y}%`,
                        animation: `ember-float ${ember.duration}s ease-in-out infinite`,
                        animationDelay: `${ember.delay}s`,
                        boxShadow: `
              0 0 ${ember.size * 2}px rgba(245, 158, 11, 0.6),
              0 0 ${ember.size * 4}px rgba(245, 158, 11, 0.3)
            `,
                    }}
                />
            ))}

            {/* Floating accent elements */}
            <div
                className="absolute top-1/3 left-1/4 w-64 h-64 bg-ember-core rounded-full blur-3xl opacity-5 animate-pulse"
                style={{ animation: 'fire-pulse 4s ease-in-out infinite' }}
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blood-orange rounded-full blur-3xl opacity-5 animate-pulse"
                style={{ animation: 'fire-pulse 5s ease-in-out infinite', animationDelay: '1s' }}
            />
        </div>
    );
}

/**
 * ScrollEmbers - Embers that follow scroll position
 */
export function ScrollEmbers({
    count = 8,
    className = '',
}: {
    count?: number;
    className?: string;
}) {
    const [embers, setEmbers] = useState<Ember[]>([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const generateEmbers = () => {
            const newEmbers: Ember[] = [];
            for (let i = 0; i < count; i++) {
                newEmbers.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 6 + 1,
                    duration: 2 + Math.random() * 1.5,
                    delay: Math.random() * 1.5,
                });
            }
            setEmbers(newEmbers);
        };

        generateEmbers();

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [count]);

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
            {embers.map((ember) => (
                <div
                    key={ember.id}
                    className="absolute rounded-full bg-gradient-to-br from-amber-400 to-amber-600 blur-sm opacity-50"
                    style={{
                        width: `${ember.size}px`,
                        height: `${ember.size}px`,
                        left: `${ember.x}%`,
                        top: `${ember.y + scrollY * 0.1}%`,
                        transition: 'top 0.3s ease-out',
                        animation: `ember-float ${ember.duration}s ease-in-out infinite`,
                        animationDelay: `${ember.delay}s`,
                        boxShadow: `0 0 ${ember.size * 2}px rgba(245, 158, 11, 0.5)`,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * CornerEmbers - Concentrated ember effect in corners
 */
export function CornerEmbers({
    corner = 'top-left',
    className = '',
}: {
    corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    className?: string;
}) {
    const positionMap = {
        'top-left': 'top-0 left-0',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-right': 'bottom-0 right-0',
    };

    return (
        <div
            className={`fixed ${positionMap[corner]} w-80 h-80 pointer-events-none overflow-hidden ${className}`}
        >
            <div
                className="absolute w-full h-full bg-gradient-radial from-ember-core via-transparent to-transparent blur-3xl opacity-20"
                style={{
                    animation: 'fire-pulse 3s ease-in-out infinite',
                }}
            />

            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-amber-400 to-blood-orange blur-md opacity-40"
                    style={{
                        width: `${Math.random() * 40 + 20}px`,
                        height: `${Math.random() * 40 + 20}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `ember-float ${2 + Math.random() * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                    }}
                />
            ))}
        </div>
    );
}
