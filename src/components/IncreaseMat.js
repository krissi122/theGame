import './Mat.css'
import PropTypes from 'prop-types'

const IncreaseMat = ({ value }) => {
    return (
        <div className='mats' id='increase_mat'> { value }
        </div>
    )
}

IncreaseMat.propTypes = {
    value: PropTypes.number.isRequired,
  };

export default IncreaseMat;