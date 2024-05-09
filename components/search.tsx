import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ recWord }) => {
    const [word, setWord] = useState("");

    const handleChange = (e: any) => {
        const query = e.target.value;
        setWord(query);
        recWord(query); // Pass the search query to the recWord function
    };

    return (
        <div>
            <input type='text' value={word} onChange={handleChange}></input>
        </div>
    );
}

export default SearchBar;
