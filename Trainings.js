import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'sort-table-react'
import logo from './logo.svg';
import './App.css';
import AddTrainings from './AddTrainings';

class Trainings extends Component {
    constructor (props){
        super(props);
    
    this.state = { trainings: [] };
    }
    


componentDidMount(){
    this.loadTrainings();
}

loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json()) 
    .then((responseData) => { 
       this.setState({ 
        trainings: responseData.content,
        });
    })  
   
  }

addTrainings(trainings) {
    fetch('https://customerrest.herokuapp.com/api/trainings', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainings)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  }

onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadTrainings())
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
   
         <AddTrainings addTrainings={this.addTrainings} loadTrainings={this.loadTrainings} />
       
        <div className ="container">
        
        <ReactTable data={this.state.trainings}
        
        columns={[
            {
              columns: [
    
                {
                  Header: "Date",
                  accessor: "date"
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                },
                {
                  Header: "Activity",
                  accessor: "activity",
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

export default Trainings;
