import React, { Component } from 'react';
import './ThankYou.css';
import '../../GlobalStyle.css';


class ThankYou extends Component {
    redirectToHomePage = () => {
        setTimeout(() => {
            this.props.history.push('/');
            }, 3500);
    };

    render () {
        this.redirectToHomePage();
        return (
            <div className="thank-you-container">
                <h1 className="header thank-you-header">
                    Thank you! Your order is being processed!
                </h1>
            </div>
        );
    };
}

export default ThankYou;
