const FormInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error,
  required = false,
  id,
  ...props 
}) => (
  <div className="form-field">
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

export default FormInput;
