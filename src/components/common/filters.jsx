import React from 'react';

const Filters = props => {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem, dataCollection } = props;
    const classes = "list-group-item d-flex justify-content-between align-items-center ";
    return (
        <ul class="list-group">
            {
                items.map( item => ( 
                    <li key={item[valueProperty]} style={{ cursor: "pointer" }} class={ (selectedItem && selectedItem._id === item._id) ? classes + "active"  : classes} onClick={ () => onItemSelect(item) }>
                        {item[textProperty]}
                        <span class="badge badge-primary badge-pill">{ hasOwnProperty.call(item, valueProperty) ? groupBy(dataCollection, item.name) : dataCollection.length }</span>
                    </li>
                    
                ))
            }
        </ul>
    );
}

Filters.defaultProps ={
    textProperty : "name",
    valueProperty : "_id"
};

function groupBy(dataCollection, name){
    return dataCollection.filter( item => item.genre.name === name).length;
}

export default Filters;