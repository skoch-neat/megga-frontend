const Button = ({ onClick, children, className = "theme-button", ...props }) => (
  <button onClick={onClick} className={className} {...props}>
    {children}
  </button>
);

export default Button;
