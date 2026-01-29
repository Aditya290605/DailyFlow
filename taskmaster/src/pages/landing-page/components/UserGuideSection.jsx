import React from 'react';
import Icon from '../../../components/AppIcon';

const UserGuideSection = () => {
    const steps = [
        {
            number: '01',
            title: 'Initialize Your Space',
            description: 'Create your account to unlock your personal dashboard. It takes less than 30 seconds.',
            icon: 'UserPlus'
        },
        {
            number: '02',
            title: 'Define Your Day',
            description: 'Add your 3-5 critical tasks for the day. Keep it realistic to build momentum.',
            icon: 'CheckSquare'
        },
        {
            number: '03',
            title: 'Execute & Track',
            description: 'Check off tasks as you go. Watch your daily progress bar fill up in real-time.',
            icon: 'Activity'
        },
        {
            number: '04',
            title: 'Analyze & consist',
            description: 'Review your streaks and consistency score at the end of the week. Do it again.',
            icon: 'TrendingUp'
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-background relative">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground text-lg">Your path to unshakeable consistency.</p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-lg group-hover:border-primary/50 transition-all duration-300 z-10 relative">
                                <Icon name={step.icon} size={28} className="text-foreground group-hover:text-primary transition-colors" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserGuideSection;
