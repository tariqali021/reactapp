import React, { Component } from 'react';

const SearchBox = ({ value , onSearch }) => {
    return ( 
        <input 
            type='search' 
            className='form-control form-control-sm d-inline-block col-4 mr-2' 
            value={value} 
            placeholder='Search...' 
            onChange={onSearch} />
     );
}
 
export default SearchBox;