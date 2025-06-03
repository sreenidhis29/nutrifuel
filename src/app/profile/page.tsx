'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import VideoBackground from '@/components/VideoBackground';
import styles from './page.module.css';

interface UserStats {
    workoutsCompleted: number;
    totalCaloriesBurned: number;
    streakDays: number;
    weightProgress: {
        date: string;
        weight: number;
    }[];
    goals: {
        type: string;
        target: number;
        current: number;
        unit: string;
    }[];
}

const mockStats: UserStats = {
    workoutsCompleted: 45,
    totalCaloriesBurned: 12500,
    streakDays: 7,
    weightProgress: [
        { date: '2024-01-01', weight: 75 },
        { date: '2024-01-15', weight: 73 },
        { date: '2024-02-01', weight: 71 },
        { date: '2024-02-15', weight: 70 },
    ],
    goals: [
        { type: 'Weight', target: 65, current: 70, unit: 'kg' },
        { type: 'Workouts', target: 100, current: 45, unit: 'sessions' },
        { type: 'Calories', target: 50000, current: 12500, unit: 'cal' },
    ]
};

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'settings'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        height: 170,
        weight: 70,
        goal: 'weight-loss',
        activityLevel: 'moderate'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        // TODO: Implement profile update logic
        setIsEditing(false);
    };

    return (
        <VideoBackground>
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileImage}>
                        <img src={user?.photoURL || '/media/default-avatar.png'} alt="Profile" />
                        {!isEditing && (
                            <button
                                className={styles.editButton}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                    <div className={styles.profileInfo}>
                        <h1>{user?.displayName || 'User'}</h1>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`}
                        onClick={() => setActiveTab('progress')}
                    >
                        Progress
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'overview' && (
                        <div className={styles.overview}>
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <h3>Workouts Completed</h3>
                                    <p className={styles.statValue}>{mockStats.workoutsCompleted}</p>
                                </div>
                                <div className={styles.statCard}>
                                    <h3>Calories Burned</h3>
                                    <p className={styles.statValue}>{mockStats.totalCaloriesBurned}</p>
                                </div>
                                <div className={styles.statCard}>
                                    <h3>Current Streak</h3>
                                    <p className={styles.statValue}>{mockStats.streakDays} days</p>
                                </div>
                            </div>

                            <div className={styles.goals}>
                                <h2>Your Goals</h2>
                                <div className={styles.goalsGrid}>
                                    {mockStats.goals.map((goal, index) => (
                                        <div key={index} className={styles.goalCard}>
                                            <h3>{goal.type}</h3>
                                            <div className={styles.goalProgress}>
                                                <div
                                                    className={styles.progressBar}
                                                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                                />
                                            </div>
                                            <p className={styles.goalStats}>
                                                {goal.current} / {goal.target} {goal.unit}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className={styles.progress}>
                            <div className={styles.weightChart}>
                                <h2>Weight Progress</h2>
                                <div className={styles.chart}>
                                    {mockStats.weightProgress.map((point, index) => (
                                        <div key={index} className={styles.chartPoint}>
                                            <div
                                                className={styles.point}
                                                style={{
                                                    bottom: `${(point.weight / 100) * 100}%`,
                                                    left: `${(index / (mockStats.weightProgress.length - 1)) * 100}%`
                                                }}
                                            />
                                            <span className={styles.pointLabel}>{point.weight}kg</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.chartDates}>
                                    {mockStats.weightProgress.map((point, index) => (
                                        <span key={index} className={styles.dateLabel}>
                                            {new Date(point.date).toLocaleDateString()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className={styles.settings}>
                            <h2>Profile Settings</h2>
                            <form className={styles.settingsForm}>
                                <div className={styles.formGroup}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={profileData.height}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={profileData.weight}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Goal</label>
                                    <select
                                        name="goal"
                                        value={profileData.goal}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="weight-loss">Weight Loss</option>
                                        <option value="muscle-gain">Muscle Gain</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Activity Level</label>
                                    <select
                                        name="activityLevel"
                                        value={profileData.activityLevel}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="sedentary">Sedentary</option>
                                        <option value="light">Light</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="active">Active</option>
                                        <option value="very-active">Very Active</option>
                                    </select>
                                </div>
                                {isEditing && (
                                    <div className={styles.formActions}>
                                        <button
                                            type="button"
                                            className={styles.cancelButton}
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.saveButton}
                                            onClick={handleSaveProfile}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </VideoBackground>
    );
} 