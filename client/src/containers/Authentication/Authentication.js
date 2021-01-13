import React, { Component } from 'react';
import Auxiliary from '../../high-order-component/Auxiliary';
import LogIn from '../../components/Authentication/LogIn/LogIn';
import SignUp from '../../components/Authentication/SignUp/SignUp';

class Authentication extends Component {
  state = {
    logIn: true
  };

  updateAuthAction = () => {
    const oldAuthAction = this.state.logIn;
    this.setState({logIn: !oldAuthAction});
  };

  render () {
    return (
      <Auxiliary>
        {this.state.logIn
          ? <LogIn updateAuthAction={this.updateAuthAction} />
          : <SignUp updateAuthAction={this.updateAuthAction} />}
      </Auxiliary>
    );
  };
}

export default Authentication;
