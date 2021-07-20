/*eslint-disable */
import React, { useEffect, useLayoutEffect, useState } from 'react';

/**
 * Loads the Image asynchronously
 * @param {*} props 
 * @returns 
 */
export const ImageLoader = (props)=>{
    
    const placeholder = 'https://via.placeholder.com/1200x600.png/6b6666/FFFFFF?text=Condenast%20-%20No%20image'

    const [loadedImage, setLoadedImage] = useState(props.src || placeholder);
    
    return <img 
        alt={props.alt} 
        src={loadedImage} 
        loading="lazy" 
        role="presentation" 
        onError={()=>{
            setLoadedImage(placeholder);
        }} 
    />
}

export default ImageLoader;

/*eslint-enable */