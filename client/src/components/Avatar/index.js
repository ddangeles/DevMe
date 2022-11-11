import React from "react";
import {getRandomColor,createImageFromInitials} from '../../utils/avatarHelper';
import "./style.css";

// const name = "Drew";
const imgSrc = "";

function Avatar({name}) {
    

	return (

        
		<span>
			<img
				id='preview'
				src={
					imgSrc.length <= 0
						? createImageFromInitials(50, name, getRandomColor())
						: imgSrc
				}
				alt='profile-pic'
			/> 
            
		</span>
	);
}

export default Avatar;