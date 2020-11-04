
import React from "react";
import "./styles.css"

const Card = (props) => {
   
   
    return(
        <span onClick={() => props.setClicked(props.id)} className="card col-md-3">
				<span className="img-container">
					<img alt={props.name} src={props.image} />
				</span>
			</span>

        )
}


export default Card