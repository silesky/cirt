import React from 'react';
import ReactDOM from 'react-dom';

class OrderForm extends React.Component {
      render() {
        const { currentOrderStatus, updateStatus } = this.props;
        return ( 
          <div className="order_status">
          <div className="column">
              {/* set default value */}
              <select onChange={updateStatus} value={
                currentOrderStatus === "In Progress" || "Done" || "Cancelled"
                  ? currentOrderStatus 
                  : 'In Progress'
              }>
                <option value="In Progress">In Progress</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Done">Done</option>
            </select>
            </div>
          </div>
    );
  } 
}
OrderForm.defaultProps = {
  currentOrderStatus: ''
}
OrderForm.propTypes = {
  currentOrderStatus: React.PropTypes.oneOf(['In Progress', 'Done', 'Cancelled']),
  updateStatus: React.PropTypes.func,
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
          // search form
          hidden: [],
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
        this.checkStatus = (key) => {
          // returns class names
          switch (this.state.orderStatus[key]) {
            case 'Cancelled':
              return 'cancelled'
            case 'In Progress':
              return 'in-progress'
            case 'Done':
              return 'done'
            default:
              break;
            }
        }
        this.updateStatus = (key, event) => {
          // key is also the index of the current value
          const newStatus = event.target.value;
          // copy, don't mutate
          const freshCopy = this.state.orderStatus.slice(0)
          freshCopy[key] = newStatus;
          this.setState({orderStatus: freshCopy});
        }

        
        this.checkHidden = (key) => {
          // returns class name
          const isHidden = this.state.hidden.find(el => el === key);
          if (isHidden) return 'hide';
        }
        this.updateHidden = (event) => {
          const searchTerm = event.target.value;
          // returns an array of hidden items... basically, everything that's not in the search results is going to be here

          // need an array of matches, which I will then search
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
      <div>
        <div className="top_bar">
          <div className="search_bar">
            <form>
              <input type="text" onChange={this.updateHidden} placeholder="Search..." />
            </form>
          </div>
        </div>
        <div className="fields">
           {/* for clarity: when dealing with repetitive elements,
            * I prefer to break convention and keep things on one line...
            * preserving the implicit return. 
            */}
          <div className="column">
            <h2>Name</h2>
            { name.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{el}</h4></div>) }
          </div>
          <div className="column">
            <h2>Technician</h2>
            { technician.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{el}</h4></div>) }
           </div>
          <div className="column">
            <h2>Order Date</h2>
            { orderDate.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{el}</h4></div>) }
          </div>
            <div className="column">
              <h2>Appt. Type</h2>             
              { apptType.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{el}</h4></div>) }
            </div>
            <div className="column">
              <h2>Cell Number</h2>
              { cellNumber.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{el}</h4></div>) }
            </div>
            <div className="column">
              <h2>Email</h2>
              { email.map((el, ind) => <div className={`field-container ${this.checkStatus(ind)}`} key={ind}><h4>{ el}</h4></div>) }  
            </div>
              <div className="column">
                <h2>Order Status</h2>
                { orderStatus.map((el, ind) => {
                  return (
                    <div className={`field-container ${this.checkHidden(ind)} ${this.checkStatus(ind)}`} key={ind}>
                      <h4>  {/* prepend the current index to the arguments */}
                        <OrderForm updateStatus={this.updateStatus.bind(this, ind)} currentOrderStatus={el} />
                      </h4> 
                </div>)
              })
             }
            </div>
        </div>
        </div>
       
    );
    }
}

ReactDOM.render(<FieldsContainer />, document.getElementById('root'));