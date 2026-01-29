import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProfileSection = ({ currentStreak, completionRate, totalCompleted = 0 }) => {
    const [user, setUser] = useState({ fullName: 'User' });
    const [level, setLevel] = useState({ name: 'Novice', progress: 0, next: 'Apprentice' });

    useEffect(() => {
        // Load user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, []);

    // Gamification Logic
    useEffect(() => {
        // Simple score calculation: (Streak * 10) + (Completion Rate * 5) + (Total Tasks * 2)
        const score = (currentStreak * 10) + (completionRate * 5) + (totalCompleted * 2);

        let lvlName = 'Novice';
        let nextLvl = 'Apprentice';
        let progress = 0;

        if (score < 100) {
            lvlName = 'Novice';
            nextLvl = 'Apprentice';
            progress = (score / 100) * 100;
        } else if (score < 500) {
            lvlName = 'Apprentice';
            nextLvl = 'Pro';
            progress = ((score - 100) / 400) * 100;
        } else if (score < 1000) {
            lvlName = 'Pro';
            nextLvl = 'Expert';
            progress = ((score - 500) / 500) * 100;
        } else if (score < 2500) {
            lvlName = 'Expert';
            nextLvl = 'Master';
            progress = ((score - 1000) / 1500) * 100;
        } else {
            lvlName = 'Master';
            nextLvl = 'Legend';
            progress = 100;
        }

        setLevel({
            name: lvlName,
            progress: Math.min(Math.max(progress, 0), 100),
            next: nextLvl,
            score: Math.round(score)
        });

    }, [currentStreak, completionRate, totalCompleted]);

    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm flex flex-col justify-center h-full relative overflow-hidden group">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon name="Award" size={120} className="text-primary rotate-12" />
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                    <span className="text-2xl font-bold text-primary">
                        {user.fullName.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground leading-none">
                        {user.fullName}
                    </h3>
                    <p className="text-sm font-medium text-primary mt-1 flex items-center gap-1">
                        <Icon name="Crown" size={14} />
                        {level.name}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Score</p>
                    <p className="text-2xl font-bold text-foreground">{level.score}</p>
                </div>
            </div>

            <div className="mt-6 relative z-10 w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Current Level</span>
                    <span>Next: {level.next}</span>
                </div>
                <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{ width: `${level.progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
