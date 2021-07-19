/*eslint-disable */
import React, { useState } from 'react';

/**
 * Loads the Image asynchronously
 * @param {*} props 
 * @returns 
 */
export const ImageLoader = (props)=>{

    const [loadedImage, setLoadedImage] = useState(props.src ? '': 'https://via.placeholder.com/1200x600.png/6b6666/FFFFFF?text=Condenast%20-%20No%20image');
    
    if(props.src){
        const imageLoad = new Image();
        imageLoad.src = props.src;
        imageLoad.onload = function(){
            // once memory cached in browser use the same link        
            setLoadedImage(props.src);
        };
    }

    return <img alt={props.alt} src={loadedImage} role="presentation" />
}

export default ImageLoader;

/*eslint-enable */