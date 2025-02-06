import propTypes from 'prop-types';

const Emoji = ({ symbol, label }) => (
  <span
    role="img"
    aria-label={label || ""}
    aria-hidden={!label}
  >
    {symbol}
  </span>
);

Emoji.propTypes = {
  symbol: propTypes.string.isRequired,
  label: propTypes.string,
};

export default Emoji;