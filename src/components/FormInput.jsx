const FormInput = ({ label, type = "text", value, onChange, ...props }) => (
  <label>
    {label}
    <input type={type} value={value} onChange={onChange} {...props} />
  </label>
);

export default FormInput;
