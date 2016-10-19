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
      }

      getData: () => {
        // fetch API goes here
      }

    // ajax request goes here
    // state.map((el) => el.date etc
    // state.map((el) => el.name etc
    render() {
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
                  <h4>safassa</h4>
                  <h4>safassa</h4>
                  <h4>safassa</h4>
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