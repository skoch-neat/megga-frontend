import propTypes from 'prop-types';

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
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  required: propTypes.bool,
};

export default FormInput;
