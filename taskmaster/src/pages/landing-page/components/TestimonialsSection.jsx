import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Product Manager',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    avatarAlt: 'Professional woman with shoulder-length brown hair wearing navy blazer smiling at camera',
    rating: 5,
    content: 'DailyFlow transformed how I approach my workday. The streak tracking keeps me motivated, and seeing my progress visualized is incredibly satisfying. I have maintained a 45-day streak!'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Software Engineer',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d71bf353-1763296801816.png",
    avatarAlt: 'Asian man with short black hair wearing glasses and gray sweater in professional setting',
    rating: 5,
    content: 'As someone who struggles with consistency, this app has been a game-changer. The GitHub-style calendar makes tracking progress fun and the dark theme is perfect for late-night planning.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e33e7931-1763294360998.png",
    avatarAlt: 'Hispanic woman with long dark hair wearing white blouse smiling warmly at camera',
    rating: 5,
    content: 'The simplicity is what sold me. No overwhelming features, just what I need to plan my day and track completion. My productivity has increased by 40% since I started using DailyFlow.'
  }];


  return (
    <section className="py-12 md:py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Loved by Productivity Enthusiasts
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users building consistent habits every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials?.map((testimonial) =>
          <div
            key={testimonial?.id}
            className="bg-background border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-250 hover:shadow-lg">

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-semibold text-foreground truncate">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {testimonial?.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(testimonial?.rating)]?.map((_, index) =>
              <Icon
                key={index}
                name="Star"
                size={16}
                color="var(--color-accent)"
                className="fill-current" />

              )}
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                "{testimonial?.content}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;