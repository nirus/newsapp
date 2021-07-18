import React, { useState } from 'react';
import styles from '../styles/search.module.scss';

export const SearchBar = (props)=>{
    const [searchText, setSearchText] = useState(props.searchText);
    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <input aria-label="enter news search test here" type="text" className={styles.searchTerm} placeholder="Search for news?" value={searchText} onChange={(event)=> setSearchText(event.target.value)}/>
                <button type="submit" className={styles.searchButton} aria-label="click to search the news" onClick={() => props.onClick(searchText)}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;