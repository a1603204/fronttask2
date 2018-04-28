import React from 'react';
import SkyLight from 'react-skylight';

class AddCustomers extends React.Component {
  constructor(props) {
      super(props);
      this.state = {firstname: '', lastname: '',  email: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  handleSubmit = (event) => {
      event.preventDefault();
      var newCustomers = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email};
      this.props.addCustomers(newCustomers);    
      this.props.loadCustomers();
      this.refs.simpleDialog.hide();    
  }
  
  render() {
      const addCustomersDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addCustomersDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body">
              <h5 className="card-title">New car</h5>
              <form>
                  <div className="form-group">
                      <input type="text" placeholder="First name" className="form-control" name="firstname" onChange={this.handleChange}/>    
                  </div>
                  <div className="form-group">       
                      <input type="text" placeholder="Last name" className="form-control" name="lastname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
                  </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                  </div>       
              </form>
              </div>      
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New customers</button>
        </div>
      </div>   
    );
  }
}

export default AddCustomers;
