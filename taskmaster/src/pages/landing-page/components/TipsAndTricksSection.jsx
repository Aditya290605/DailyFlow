import React from 'react';
import Icon from '../../../components/AppIcon';

const TipsAndTricksSection = () => {
    const tips = [
        {
            id: 1,
            icon: 'Clock',
            title: 'The 2-Minute Rule',
            description: 'If it takes less than 2 minutes, do it now. Clear small clutter from your mind instantly.',
            color: 'bg-blue-500/10 text-blue-500'
        },
        {
            id: 2,
            icon: 'Zap',
            title: 'Eat That Frog',
            description: 'Tackle your hardest task first thing in the morning when your energy is highest.',
            color: 'bg-amber-500/10 text-amber-500'
        },
        {
            id: 3,
            icon: 'Focus',
            title: 'Pomodoro Power',
            description: 'Work for 25 minutes, break for 5. Intense focus paired with regular recovery.',
            color: 'bg-red-500/10 text-red-500' // 'Focus' might not be in AppIcon, filtering to mapped icons or generic
        },
        {
            id: 4,
            icon: 'List',
            title: 'Capture Everything',
            description: 'Don’t trust your brain to remember. Write every task down to free up mental space.',
            color: 'bg-green-500/10 text-green-500'
        }
    ];

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6">
                        Master Your Workflow
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Productivity isn't just about tools; it's about mindset. Here are proven strategies integrated into our philosophy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tips.map((tip) => (
                        <div
                            key={tip.id}
                            className="group relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className={`w-14 h-14 rounded-xl ${tip.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon name={tip.icon} size={28} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">{tip.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TipsAndTricksSection;
