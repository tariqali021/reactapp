import React, { Component } from 'react';

const SelectField = ({ label, name, options, selectedItem, onChange }) => {
    
    return ( 
        <div class="form-group">
            <label htmlFor={name}>{label}</label>
            <select class="form-control" id={name} name={name} onChange={onChange} value={selectedItem}>
               { 
                   options.map( val => (
                        <option key={val._id} value={val._id}>{ val.name }</option>
                    ))
                }
            </select>
        </div>
     );
}
 
export default SelectField;