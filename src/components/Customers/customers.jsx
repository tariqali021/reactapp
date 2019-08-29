import React, { Component } from 'react';
import * as customers from '../../services/customers';
import { Link } from "react-router-dom";
import Pagination from '../common/pagination';
import {paginate} from "../../utils/paginate";
import SearchBox from '../common/FormElements/search';
import _ from "lodash";
import { toast } from "react-toastify";
import CustomersTable from '../Customers/customersTable';


class Customer extends Component {
    state = { 
        customers : [],
        currentPage : 1,
        pageSize : 4,
        sortColumn : { sortBy:"name", orderBy:"asc" },
        searchQuery : ""
    }

    async componentDidMount() {
        console.log('componentDidMount')
        const {data} = await customers.getAllCustomers();
        this.setState({ customers : data });
    }

    handleDelete = async movie => {
        const { data : response } = await customers.deleteCustomer(movie._id);
        if(!response.error){
            this.setState({ customers : response.data });
            toast.success(response.message);
            if(!paginate(response.data, this.state.currentPage, this.state.pageSize).length){
                this.setState({currentPage:this.state.currentPage -1});
            }
        }
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    };

    handleSort = async sortColumn => {
        const { data : response } = await customers.sortCustomers(sortColumn.sortBy, sortColumn.orderBy);
        sortColumn.orderBy = sortColumn.orderBy == 'asc' ? 'desc' : 'asc';
        this.setState({ sortColumn, customers : response.data });
    };

    handleSearch = async e => {
        const text = e.currentTarget.value;
        const { data : response } = await customers.searchCustomer(text);
        this.setState({ customers : response.data, searchQuery : text, currentPage:1 });
    }

    render() { 
        
        const { currentPage, pageSize, customers, sortColumn, searchQuery } = this.state;
        
        return (
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-3 pl-0">
                            <h4>Customers List</h4> 
                        </div>
                        <div class="col-9 pr-0 text-right">
                            <SearchBox value={searchQuery} onSearch={this.handleSearch} />
                        </div>
                    </div>
                    <div class="row">
                        <CustomersTable 
                            customers = {customers} 
                            deleteCustomer = {this.handleDelete} 
                            sortCustomers = {this.handleSort} 
                            sortColumn = {sortColumn}
                        /> 
                    </div>
                    <div class="row">
                        <div class="col-5 text-center">
                                <Pagination 
                                    itemsCount={customers.length} 
                                    pageSize={pageSize} 
                                    currentPage={currentPage} 
                                    onPageChange={this.handlePageChange}  
                                />
                        </div>
                        <div class="col-7 text-right">
                            <p>Showing {customers.length} customers in the database.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Customer;