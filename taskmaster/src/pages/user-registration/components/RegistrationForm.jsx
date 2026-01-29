import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumber = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      strength: [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]?.filter(Boolean)?.length
    };
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-error';
    if (strength <= 3) return 'bg-warning';
    if (strength <= 4) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData?.password);
      if (!passwordValidation?.isValid) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { signup } = await import('../../../services/api');

      await signup(formData.fullName, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrors({
        form: err.response?.data?.msg || 'Registration failed. Please try again.'
      });
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData?.password);

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        description="We'll never share your email with anyone else"
        required
      />
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordValidation?.strength)}`}
                  style={{ width: `${(passwordValidation?.strength / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground min-w-[60px]">
                {getPasswordStrengthText(passwordValidation?.strength)}
              </span>
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className={`flex items-center gap-2 ${formData?.password?.length >= 8 ? 'text-success' : ''}`}>
                <Icon name={formData?.password?.length >= 8 ? "CheckCircle2" : "Circle"} size={14} />
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${/[A-Z]/?.test(formData?.password) && /[a-z]/?.test(formData?.password) ? 'text-success' : ''}`}>
                <Icon name={/[A-Z]/?.test(formData?.password) && /[a-z]/?.test(formData?.password) ? "CheckCircle2" : "Circle"} size={14} />
                Uppercase and lowercase letters
              </li>
              <li className={`flex items-center gap-2 ${/\d/?.test(formData?.password) ? 'text-success' : ''}`}>
                <Icon name={/\d/?.test(formData?.password) ? "CheckCircle2" : "Circle"} size={14} />
                At least one number
              </li>
              <li className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) ? 'text-success' : ''}`}>
                <Icon name={/[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) ? "CheckCircle2" : "Circle"} size={14} />
                At least one special character
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
        {formData?.confirmPassword && formData?.password === formData?.confirmPassword && (
          <div className="flex items-center gap-2 mt-2 text-xs text-success">
            <Icon name="CheckCircle2" size={14} />
            Passwords match
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Checkbox
          label={
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => window.open('/terms', '_blank')}
                className="text-primary hover:underline"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={() => window.open('/privacy', '_blank')}
                className="text-primary hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={agreedToTerms}
          onChange={(e) => {
            setAgreedToTerms(e?.target?.checked);
            if (errors?.terms) {
              setErrors(prev => ({ ...prev, terms: '' }));
            }
          }}
          error={errors?.terms}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/user-login')}
            className="text-primary hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;