import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className,
  type,
  isLoading,
  disabled,
  children,
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
    {isLoading ? <span className="loading-spinner" aria-label='Loading...' /> : children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
