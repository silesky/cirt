import React from 'react'; 
import ReactDOM from 'react-dom';
import { range } from 'lodash';
import { searchObj } from '../util';


class OrderForm extends React.Component {
      render() {
        const { currentOrderStatus, updateStatus } = this.props;
        return (
          <div className="order_status">
          <div className="column">
              {/* set default value */}
              <select 
              className={currentOrderStatus === 'Cancelled' ? 'cancelled-select-border' : undefined} 
              onChange={updateStatus} 
              value={
                currentOrderStatus === 'In Progress' || 'Done' || 'Cancelled'
                  ? currentOrderStatus
                  : 'In Progress'
              }>

                <option value='In Progress'>In Progress</option>
                <option value='Cancelled'>Cancelled</option>
                <option value='Done'>Done</option>
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
      constructor() {
        super();
        this.state = {
          name: [],
          technician: [],
          orderDate: [],
          apptType: [],
          cellNumber: [],
          email: [],
          orderStatus: [],
          // search form
          visible: [],
        };
        this.getData = () => {
          return fetch('data/data.json')
            .then(response => response.json())
        }
        this.componentWillMount = () => {
          this.getData().then(res => {
            res.map((el, index) => {
              this.setState( {name: [...this.state.name, el['Name']] } );
              this.setState( {technician: [...this.state.technician, el['Technician']]} );
              this.setState( {orderDate: [...this.state.orderDate, el['Order Date']]} );
              this.setState( {apptType: [...this.state.apptType, el['Appt. Type']] });
              this.setState( {cellNumber: [...this.state.cellNumber, el['Cell Number']] });
              this.setState( {email: [...this.state.email, el['Email']] });
              this.setState( {orderStatus: [...this.state.orderStatus, el['Order Status']] });
              this.setState( {visible: [...this.state.visible, index] });
            })
        });

        }

        // returns class names.
        this.checkStatus = (key) => {
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
          // key is also the index of the current value.
          const newStatus = event.target.value;
          // copy, don't mutate.
          const freshCopy = this.state.orderStatus.slice(0)
          freshCopy[key] = newStatus;
          this.setState({orderStatus: freshCopy});
        }
        this.checkVisible = (key) => {
          // returns one of two class names.
          const isVisible = this.state.visible.find(el => el === key);
          return (isVisible) ? 'visible' : 'hidden';
        }
        /*  consumes an event object w/ the current input.
         *  returns an array of indexes (each index is a match).
         */
        this.updateVisible = ({ target: {value} }) => {
          const matchArr = searchObj(value, this.state);
             if (matchArr.length) {
              this.setState({visible: matchArr});
            } else {
              // if there's no match, fill the array back up so all rows are visible again.
              this.setState({visible: range(name.length)});
            }
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

        const getClasses = (ind) => {
            const addStriping = (ind) => (ind % 2 === 0) ? 'even' : 'odd';
            return `field-container ${addStriping(ind)} ${this.checkVisible(ind)} ${this.checkStatus(ind)}`
        }
        const getStatusIcons = (el) => {
            switch (el) {
                case 'Cancelled':
                    return 'fa fa-times';
                case 'Done':
                    return 'fa fa-check'
                case 'In Progress':
                    return 'fa fa-spinner';
            }
        }
        return (
            <div>
                <div className="top_bar">
                    <div className="top_bar--left"> 
                        <img src="img/Home.png" />
                        <img src="img/Inbox.png" />
                        <img src="img/Calendar.png" />
                    </div>
                    <div className="top_bar--middle">
                        <form className="search_bar">
                            <input type="text" onChange={this.updateVisible.bind(this)} placeholder="Search..." />
                        </form>
                    </div>
                    <div className="top_bar--right">
                        <img src="img/Profile.png" />
                    </div>
                </div>
            <div className="fields">
               {/* for clarity: when dealing with repetitive elements,
                * I prefer to break convention and keep things on one line...
                * preserving the implicit return.
                */}
                <div className="column">
                <h2>&nbsp;</h2>
                { orderStatus.map((el, ind) => {
                return ( <div 
                    className={getClasses(ind)} 
                    key={ind}>
                        <h4>
                            <i className={getStatusIcons(el)}></i>
                        </h4>
                    </div>
                    ) } 
                )}
                </div>
              <div className="column">
                <h2>Name</h2>
                { name.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{el}</h4></div>) }
              </div>
              <div className="column">
                <h2>Technician</h2>
                { technician.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{el}</h4></div>) }
               </div>
              <div className="column">
                <h2>Order Date</h2>
                { orderDate.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{el}</h4></div>) }
              </div>
                <div className="column">
                  <h2>Appt. Type</h2>
                  { apptType.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{el}</h4></div>) }
                </div>
                <div className="column">
                  <h2>Cell Number</h2>
                  { cellNumber.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{el}</h4></div>) }
                </div>
                <div className="column">
                  <h2>Email</h2>
                  { email.map((el, ind) => <div className={getClasses(ind)} key={ind}><h4>{ el}</h4></div>) }
                </div>
                  <div className="column">
                    <h2>Order Status</h2>
                    { orderStatus.map((el, ind) => {
                      return (
                        <div className={getClasses(ind)} key={ind}>
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
