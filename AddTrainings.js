import React from 'react';
import SkyLight from 'react-skylight';

class AddTrainings extends React.Component {
  constructor(props) {
      super(props);
      this.state = {date: '', duration: '',  activity: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
  handleSubmit = (event) => {
      event.preventDefault();
      var newTrainings = {date: this.state.date, duration: this.state.duration, activity: this.state.activity};
      this.props.addTrainings(newTrainings);    
      this.props.loadTrainings();
      this.refs.simpleDialog.hide();    
  }
  
  render() {
      const addTrainingsDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addTrainingsDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body">
              <h5 className="card-title">New car</h5>
              <form>
                  <div className="form-group">
                      <input type="text" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>    
                  </div>
                  <div className="form-group">       
                      <input type="text" placeholder="Duration " className="form-control" name="duration" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                  </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                  </div>       
              </form>
              </div>      
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New trainings</button>
        </div>
      </div>   
    );
  }
}

export default AddTrainings;
