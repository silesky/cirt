import React from 'react';
import ReactDOM from 'react-dom';



// grabs props from 
class OrderForm extends React.Component {
    constructor(props) {
        super(props);
    }
    // this should take a string prop that tells us if it's in-progress, cancelled, in progress, etc
      render() {
        return (
          <div>
          <div className="column">
              <select value="cancelled">
                <option value="in-progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
                <option value="done">Done</option>
            </select>
            </div>
          </div>
    );
  } 
}


class FieldsContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          name: [],
          technician: [],
          orderDate: [],
          apptType: [],
          cellNumber: [],
          email: [],
          orderStatus: [],
        };
        this.getData = () => {
          return fetch('data/data.json')
            .then(response => response.json())
        }
        this.componentWillMount = () => {
          this.getData().then(res => {
            res.map(el => {
              // store this in the state
              this.setState( {name: [...this.state.name, el['Name']] } );
              this.setState( {technician: [...this.state.technician, el['Technician']]} );
              this.setState( {orderDate: [...this.state.technician, el['Order Date']]} );
              this.setState( {apptType: [...this.state.apptType, el['Appt. Type']] });
              this.setState( {cellNumber: [...this.state.cellNumber, el['Cell Number']] });
              this.setState( {email: [...this.state.email, el['Email']] });
              this.setState( {orderStatus: [...this.state.orderStatus, el['Order Status']] });
            })
        });
        }
        this.componentDidMount = () => console.log(this.state);

     
    }
   


    // ajax request goes here
    // state.map((el) => el.date etc
    // state.map((el) => el.name etc
    render() {



console.log(this.state);
    return (
      
        <div className="fields">
            <div className="column">
                <h2>Name</h2>
            </div>
            <div className="column">
                <h2>Technician</h2>
            </div>
            <div className="column">
                <h2>Order Date</h2>
            </div>
            <div className="column">
                <h2>Appt. Type</h2>
            </div>
            <div className="column">
                <h2>Cell Number</h2>
            </div>
            <div className="column">
                <h2>Email</h2>
                <h4>email</h4>
                
                </div>
             <div className="column">
                <h2>Order Status</h2>
                <OrderForm />
            </div>
        </div>
    );
    }
}

ReactDOM.render(<FieldsContainer />, document.getElementById('root'));