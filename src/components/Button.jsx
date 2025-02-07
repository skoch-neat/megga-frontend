import { Button as AmplifyButton } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className,
  type = 'button',
  isLoading = false,
  disabled = false,
  children,
  variation = 'primary',
  colorTheme,
  size,
  ...props
}) => (
  <AmplifyButton
    onClick={onClick}
    className={className}
    type={type}
    isLoading={isLoading}
    isDisabled={isLoading || disabled}
    variation={variation}
    colorTheme={colorTheme}
    size={size}
    {...props}
  >
    {children}
  </AmplifyButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  variation: PropTypes.oneOf(['primary', 'link', 'menu', 'warning', 'destructive']),
  colorTheme: PropTypes.oneOf(['error', 'info', 'warning', 'success', 'overlay']),
  size: PropTypes.oneOf(['small', 'large']),
};

export default Button;
