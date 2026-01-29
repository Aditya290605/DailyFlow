import React from 'react';

const InspirationalQuotesSection = () => {
    return (
        <section className="py-24 md:py-32 bg-secondary/5 relative overflow-hidden">
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <div className="mb-12">
                    <span className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                        </svg>
                    </span>
                    <blockquote className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                        "Success is the sum of small efforts, repeated day in and day out."
                    </blockquote>
                    <cite className="block mt-8 text-lg font-medium text-muted-foreground not-italic">
                        — Robert Collier
                    </cite>
                </div>
            </div>
        </section>
    );
};

export default InspirationalQuotesSection;
