import React, { useState, forwardRef, useImperativeHandle } from "react"


const Toggler = forwardRef(function(props, ref){
    const [visibility, setVisibility] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            setVisibility
        }
    })

    function toggleVisibility(){
        setVisibility(!visibility)
    }

    return(
        <section>
            <button
                style={{ display: visibility ? "none" : "" }}
                onClick={toggleVisibility}
            >
                { props.buttonLabel }
            </button>
            <div
                style={{ display: visibility ? "" : "none" }}
                className="toggler-content"
            >
                {props.children}
            </div>
            <div
                style={{ display: visibility ? "" : "none" }}
            >
                <button
                    type="button" onClick={toggleVisibility}
                >
                    Cancel
                </button>
            </div>
            <br /><br />
        </section>
    )
})

Toggler.displayName = "Toggler"

export default Toggler