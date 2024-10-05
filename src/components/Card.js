import './Card.css'
import PropTypes from 'prop-types'

const Card = ({ card, hideCard }) => {
    return (
        <div className="card">
            {hideCard ? (
                <div className="not_playable">{card}</div>
            ) : (
                <div>{card}</div>
            )
            }
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([' '])
    ]).isRequired,
    hideCard: PropTypes.bool
};

export default Card;