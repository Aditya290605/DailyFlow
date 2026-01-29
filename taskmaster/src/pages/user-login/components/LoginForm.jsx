import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    email: 'user@dailyflow.com',
    password: 'DailyFlow2026!'
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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

    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        navigate('/dashboard');
      } else {
        setErrors({
          form: `Invalid credentials. Please use:\nEmail: ${mockCredentials?.email}\nPassword: ${mockCredentials?.password}`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    navigate('/landing-page');
  };

  const handleSignUp = () => {
    navigate('/user-registration');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.form && (
          <div className="p-4 rounded-lg bg-error/10 border border-error/20">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error whitespace-pre-line">{errors?.form}</p>
            </div>
          </div>
        )}

        <div>
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
            className="w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need an account?{' '}
            <button
              type="button"
              onClick={handleSignUp}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;