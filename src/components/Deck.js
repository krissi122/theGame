import './Deck.css';
import PropTypes from 'prop-types';

const Deck = ({ message }) => {
  return (
    <div className="deck">
      {message}
    </div>
  );
};

Deck.propTypes = {
  message: PropTypes.string.isRequired, // Ensure message is a required string
};

export default Deck;