import React, { Component } from 'react';

const MovieDetail = (props) => {
    return ( 
        <h3>{props.match.params.id}</h3>
     );
}
 
export default MovieDetail;