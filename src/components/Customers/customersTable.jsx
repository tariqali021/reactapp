import React, { Component } from 'react';
import Table from "../common/table";
import { Link } from 'react-router-dom';

const CustomersTable = (props) => {
    
  const { customers, deleteCustomer, sortCustomers, sortColumn } = props;
    
    const columns = [
        { path: "name" , label: "Name", content : customer => <Link to={`/customers/${customer._id}`}>{customer.name}</Link> },        
        { path: "email", label: "Email" },
        {
          key: "delete",
          content: customer => (
            <button
              onClick={() => deleteCustomer(customer)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          )
        }
    ];
        
    return ( 
        <Table columns={columns} data={customers} sortColumn={sortColumn} sortData={sortCustomers} />
     );
}
 
export default CustomersTable;