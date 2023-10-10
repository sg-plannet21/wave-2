import Spinner from '@/components/Feedback/Spinner/Spinner';
import classNames from 'classnames';
import React from 'react';

const variants = {
  primary: 'bg-brand-500 text-white',
  inverse:
    'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-500',
  danger: 'bg-red-500 text-white focus:ring-red-500',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type IconProps =
  | {
      startIcon: React.ReactNode;
      endIcon?: never;
    }
  | {
      startIcon?: never;
      endIcon: React.ReactNode;
    }
  | {
      startIcon?: undefined;
      endIcon?: undefined;
    };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type === 'button' ? 'button' : 'submit'}
      className={classNames(
        'flex justify-center items-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {!isLoading && startIcon}
      <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      {isLoading && (
        <Spinner size="sm" className="text-current dark:text-current" />
      )}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
