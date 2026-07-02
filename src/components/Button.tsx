import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-[#6DBE45] text-white hover:bg-[#5da838] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#DFC5FE] text-[#6DBE45] hover:bg-[#d4b5f8] shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-[#6DBE45] text-[#6DBE45] hover:bg-[#6DBE45] hover:text-white'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
