import React, { Component } from 'react';

const TextField = (props) => {
    const { label, type, name , value, onChange } = props;
    return ( 
        <div class="form-group">
            <label htmlFor="email">{ label }</label>
            <input id={ name } type={ type } name= { name } value={value} className="form-control" onChange={ onChange } />
        </div>
     );
}
 
export default TextField;