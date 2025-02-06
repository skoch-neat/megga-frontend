const Emoji = ({ symbol, label }) => (
  <span
    role="img"
    aria-label={label || ""}
    aria-hidden={!label}
  >
    {symbol}
  </span>
);

export default Emoji;