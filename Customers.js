import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'sort-table-react'
import logo from './logo.svg';
import './App.css';
import AddCustomers from './AddCustomers';

class Customers extends Component {
    constructor (props){
        super(props);
    
    this.state = { customers: [] };
    }
    


componentDidMount(){
    this.loadCustomers();
}

loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => { 
       this.setState({ 
        customers: responseData.content,
        });
    })  
   
  }

//add
addCustomers(customers) {
    fetch('https://customerrest.herokuapp.com/api/customers', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customers)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

      
    //delete
onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCustomers())
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });        
      }
    })   
  }
  



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
  
        <AddCustomers addCustomers={this.addCustomers} loadCustomers={this.loadCustomers} />
        <div className ="container">
        
        <ReactTable data={this.state.customers}

        columns={[
            {
              columns: [
    
                {
                  Header: "First Name",
                  accessor: "firstname"
                },
                {
                  Header: "Last name",
                  accessor: "lastname",
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: '_links.self.href',
    Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
              ]
            }
          ]}
          
          defaultPageSize={10}
          filterable
          className="-striped -highlight" > 
        </ReactTable>,
      </div>
        </div>
    );
  }
}

export default Customers;
