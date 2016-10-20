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
          <div className="order_status">
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
              this.setState( {name: [...this.state.name, el['Name']] } );
              this.setState( {technician: [...this.state.technician, el['Technician']]} );
              this.setState( {orderDate: [...this.state.orderDate, el['Order Date']]} );
              this.setState( {apptType: [...this.state.apptType, el['Appt. Type']] });
              this.setState( {cellNumber: [...this.state.cellNumber, el['Cell Number']] });
              this.setState( {email: [...this.state.email, el['Email']] });
              this.setState( {orderStatus: [...this.state.orderStatus, el['Order Status']] });
            })
        });
        }
    }
   
    render() {
     const { 
      name, 
      technician, 
      orderDate, 
      apptType, 
      cellNumber, 
      email, 
      orderStatus } = this.state;
    return (
        <div className="fields">
          <div className="column">
            <h2>Name</h2>
          { name.map((el, ind) => <h4 key={ind}>{el}</h4>) }
          </div>
          <div className="column">
            <h2>Technician</h2>
            { technician.map((el, ind) => <h4 key={ind}>{el}</h4>) }
           </div>
          <div className="column">
              <h2>Order Date</h2>
            { orderDate.map((el, ind) => <h4 key={ind}>{el}</h4>) }
          </div>
            <div className="column">
              <h2>Appt. Type</h2>
               { apptType.map((el, ind) => <h4 key={ind}>{el}</h4>) }
            </div>
            <div className="column">
                <h2>Cell Number</h2>
                { cellNumber.map((el, ind) => <h4 key={ind}>{el}</h4>) }
            </div>
          <div className="column">
                <h2>Email</h2>
              { email.map((el, ind) => <h4 key={ind}>{el}</h4>) }
                
          </div>
             <div className="column">
                <h2>Order Status</h2>
              { orderStatus.map((el, ind) => {
                return (
                  <h4 key={ind}> 
                    <OrderForm orderStatus={el} />
                  </h4>)
              })}
            </div>
        </div>
       
    );
    }
}

ReactDOM.render(<FieldsContainer />, document.getElementById('root'));