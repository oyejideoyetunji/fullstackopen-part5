import React from "react"
import PropTypes from "prop-types"


function StatusDisplay({ status }){
    return(
        status && <p className={status.state}>{status.message}</p>
    )
}

StatusDisplay.propTypes = {
    status: PropTypes.object
}

export default StatusDisplay