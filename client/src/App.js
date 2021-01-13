import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OrderBuilder from './containers/OrderBuilder/OrderBuilder';
import FoodTruckSelector from './containers/FoodTruckSelector/FoodTruckSelector';
import Checkout from './containers/Checkout/Checkout';
import Authentication from './containers/Authentication/Authentication';
import AccountSetting from './containers/AccountSetting/AccountSetting';
import ThankYou from './containers/ThankYou/ThankYou';

function App() {
    return (
        <div>
            <Layout>
                <Route path="/" exact component={FoodTruckSelector}/>
                <Route path="/order-builder" component={OrderBuilder}/>
                <Route path="/authentication" component={Authentication}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/account-setting" component={AccountSetting}/>
                <Route path="/thank-you" component={ThankYou}/>
            </Layout>
        </div>
    );
}

export default App;
