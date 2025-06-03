'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './NutritionGraph.module.css';

Chart.register(...registerables);

interface NutritionData {
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
}

interface NutritionGraphProps {
    data: NutritionData[];
}

export function NutritionGraph({ data }: NutritionGraphProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy existing chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Prepare data for the chart
        const dates = data.map(d => d.date);
        const calories = data.map(d => d.calories);
        const protein = data.map(d => d.protein);
        const carbs = data.map(d => d.carbs);
        const fiber = data.map(d => d.fiber);
        const fat = data.map(d => d.fat);

        // Create new chart
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Calories',
                        data: calories,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Protein (g)',
                        data: protein,
                        borderColor: '#059669',
                        backgroundColor: 'rgba(5, 150, 105, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Carbs (g)',
                        data: carbs,
                        borderColor: '#d97706',
                        backgroundColor: 'rgba(217, 119, 6, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Fiber (g)',
                        data: fiber,
                        borderColor: '#7c3aed',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Fat (g)',
                        data: fat,
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className={styles.container}>
            <h2>Nutrition Trends</h2>
            <div className={styles.chartContainer}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
} 