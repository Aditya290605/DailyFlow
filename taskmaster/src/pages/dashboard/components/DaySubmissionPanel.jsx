import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DaySubmissionPanel = ({ isSubmitted, onSubmit, completionPercentage }) => {
  const canSubmit = !isSubmitted;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Day Status
        </h3>
        <Icon 
          name={isSubmitted ? "CheckCircle2" : "Clock"} 
          size={24} 
          className={isSubmitted ? "text-success" : "text-warning"} 
        />
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm md:text-base text-muted-foreground">Status</span>
          <span className={`text-sm md:text-base font-semibold ${isSubmitted ? 'text-success' : 'text-warning'}`}>
            {isSubmitted ? 'Submitted' : 'In Progress'}
          </span>
        </div>

        {isSubmitted && (
          <div className="flex items-start gap-3 p-4 bg-success/10 border border-success/30 rounded-lg">
            <Icon name="Info" size={20} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base text-foreground font-medium">
                Day Locked
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                This day has been submitted and can no longer be edited. Final completion: {completionPercentage}%
              </p>
            </div>
          </div>
        )}

        {canSubmit && (
          <Button
            variant="success"
            size="lg"
            fullWidth
            onClick={onSubmit}
            iconName="Send"
            iconPosition="left"
          >
            Submit Day
          </Button>
        )}

        <div className="text-xs md:text-sm text-muted-foreground text-center">
          {canSubmit ? (
            <p>Submit your day to lock it and update your streak</p>
          ) : (
            <p>Days are automatically submitted at midnight</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaySubmissionPanel;