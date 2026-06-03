import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) => {
  const getBtnClass = () => {
    if (variant === 'icon') return `btn-icon ${className}`;
    if (variant === 'outline') return `btn btn-outline ${className}`;
    if (variant === 'gold-outline') return `btn btn-gold-outline ${className}`;
    return `btn btn-primary ${className}`;
  };

  return (
    <button
      type={type}
      className={getBtnClass()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
