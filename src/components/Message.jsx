import propTypes from 'prop-types';

const Message = ({ type = 'info', children }) => {
  if (!children) return null;
  return <p className={`message ${type}`}>{children}</p>;
};

Message.propTypes = {
  type: propTypes.string,
  children: propTypes.node,
};

export default Message;
