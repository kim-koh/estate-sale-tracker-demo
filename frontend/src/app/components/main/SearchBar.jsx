import Image from "next/image.js";
import styles from '../../styles/SearchBar.module.css'

import searchIcon from '../../public/icons8-search-24.png';
import sortIcon from '../../public/icons8-sort-24.png'; 

function SearchBar(props) {
    return(
        <div className={`${styles.searchBarAndSort}`}>
                    <div style={{display: "flex"}}>
                        <Image 
                            className={`${styles.searchIcon}`} 
                            src={searchIcon} 
                            alt="Magnifying glass icon, search"
                        />
                        <input 
                            className={styles.searchBar} 
                            type="text" 
                            placeholder="Search..."
                            onKeyUp={(e) => props.handleSearch(e.target.value)}
                        />
                    </div>
                    <button className={`${styles.btnSecondary}`}
                        onClick={props.handleClick}
                    >
                        <Image src={sortIcon} alt="Sort icon, sort entries by code"/>
                    </button>
        </div>
    )
}

export default SearchBar; 