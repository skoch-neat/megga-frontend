const Message = ({ type, children }) => {
  if (!children) return null;
  return <p className={`message ${type}`}>{children}</p>;
};

export default Message;
