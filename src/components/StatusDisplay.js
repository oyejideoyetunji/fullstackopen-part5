import React from "react"



function StatusDisplay({ status }){
    return(
        status && <p className={status.state}>{status.message}</p>
    )
}

export default StatusDisplay