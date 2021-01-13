import React, {Component} from 'react';
import Auxiliary from '../../high-order-component/Auxiliary';
import Payment from '../../components/Payment/Payment';

class Checkout extends Component {
    render() {
        return (
            <Auxiliary>
                <Payment selectedFood={this.props.location.state.selectedFood}
                         foodTruckId={this.props.location.state.foodTruckId}/>
            </Auxiliary>
        );
    };
}

export default Checkout;
