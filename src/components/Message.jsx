import PropTypes from 'prop-types';

const Message = ({ type = 'info', children }) => {
  if (!children) return null;
  return <p className={`message ${type}`}>{children}</p>;
};

Message.PropTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Message;
