import React from 'react';
import ImageLoader from './Image';

/**
 * Each new article link
 */
export const News = (props)=>{
    return  (
        <a target="_blank" href={props.url} className={props.className}>
            <figure suppressHydrationWarning={true}>                
                {process.browser  && <ImageLoader alt={props.title}src={props.image}></ImageLoader>}
                <figcaption>
                    <h2>{props.title} &rarr;</h2>
                    <p>{props.description || 'NO DESCRIPTION AVAILABLE'}</p>
                </figcaption>
            </figure>
            
        </a>
    )
}

export default News;