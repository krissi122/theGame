import './Mat.css'
import PropTypes from 'prop-types'

const DecreaseMat = ({ value }, { matmessage }) => {
    return (
        <div className='mats' id='decrease_mat'> { value } { matmessage }
        </div>
    )
}

DecreaseMat.propTypes = {
    value: PropTypes.number.isRequired,
    matmessage: PropTypes.string,
  };

export default DecreaseMat;