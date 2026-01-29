import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MobileNav from '../../components/ui/MobileNav';
import ProfileSection from '../dashboard/components/ProfileSection';

const ProfilePage = () => {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const api = await import('../../services/api');
                const tasksData = await api.getTasks();

                // Calculate task metrics
                if (tasksData?.length > 0) {
                    const completed = tasksData.filter(task => task?.completed).length;
                    setTotalCompleted(completed);
                    setCompletionRate(Math.round((completed / tasksData.length) * 100));
                }

                const { metrics } = await api.getAnalytics();
                setCurrentStreak(metrics?.currentStreak || 0);

            } catch (err) {
                console.error("Failed to load profile data", err);
            }
        };
        loadData();
    }, []);

    return (
        <>
            <Header />
            <div className="content-container">
                <div className="page-content max-w-4xl mx-auto">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Your Profile
                        </h1>
                        <p className="text-muted-foreground">
                            Track your journey and achievements
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="h-64 md:h-80">
                            <ProfileSection
                                currentStreak={currentStreak}
                                completionRate={completionRate}
                                totalCompleted={totalCompleted}
                            />
                        </div>

                        {/* Placeholder for future profile settings or detailed stats */}
                        <div className="bg-card/30 border border-border/50 rounded-xl p-6 text-center text-muted-foreground">
                            <p>More profile settings coming soon!</p>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNav />
        </>
    );
};

export default ProfilePage;
