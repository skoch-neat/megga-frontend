const Button = ({ 
  onClick, 
  children, 
  className = "theme-button", 
  type = "button",
  isLoading = false,
  disabled = false,
  ...props 
}) => (
  <button 
    onClick={onClick} 
    className={className} 
    type={type}
    disabled={isLoading || disabled}
    aria-busy={isLoading}
    {...props}
  >
    {isLoading ? <span className="loading-spinner" /> : children}
  </button>
);

export default Button;
