import React, { useState } from 'react';

const SearchBar = ({onSubmit}) => {
    const [term, setTerm] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        onSubmit()
    }

    const handleChange = (event) => {
        setTerm(event.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={handleChange}></input>
            </form>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchBar;