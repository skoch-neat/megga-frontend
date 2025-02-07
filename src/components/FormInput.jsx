import PropTypes from 'prop-types';

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  ...props
}) => (
  <div className="form-input">
    <label htmlFor={id}>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && (
      <span id={`${id}-error`} className="error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default FormInput;
