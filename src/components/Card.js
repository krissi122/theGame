import './Card.css'
import PropTypes from 'prop-types'

const Card = ({ card }) => {
    return (
        <div className="card">
            {card}
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['*'])
    ]).isRequired
};

export default Card;