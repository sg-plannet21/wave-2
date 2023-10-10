import classNames from 'classnames';

const variants = {
  primary:
    'bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400',
  secondary:
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-500',
  success:
    'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400',
  danger:
    'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400',
};

const sizes = {
  sm: 'px-1 py-0.5 text-xs',
  md: 'px-3.5 py-1 text-md',
  lg: 'px-4 py-2 text-lg',
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

export type BadgeProps = Omit<React.HTMLProps<HTMLSpanElement>, 'size'> & {
  label: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & IconProps;

function Badge({
  label,
  className = '',
  variant = 'primary',
  size = 'sm',
  startIcon,
  endIcon,
  ...props
}: BadgeProps) {
  return (
    <span
      className={classNames(
        'font-medium inline-flex items-center rounded border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {startIcon} {label} {endIcon}
    </span>
  );
}

export default Badge;
