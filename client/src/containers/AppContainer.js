import React, {Component} from 'react';
import {connect} from 'react-redux';
import serialize from 'form-serialize';

import App from '../components/App';
import Login from '../components/Login';
import MyNavbar from '../components/elements/MyNavbar';
import {getBoards} from '../actions/boardActions';
import {requestLogin, logInFromSession, logout} from '../actions/loginActions';

class AppContainer extends Component {

  componentDidMount() {
    if (localStorage.getItem("sessionId")) {
      if (!Object.keys(this.props.session.user).length) {
        this.props.logInFromSession();
      } else {
        this.props.getBoards();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.session.user).length && !newProps.boards.length) {
      this.props.getBoards();
    }
  }


  render() {
    const { session, boards } = this.props;
    console.log("session data", session)
    return (
      <div>
        <MyNavbar user={session.user} logout={this.props.logout}/>

        {!!localStorage.getItem("sessionId") ?        
        <App boards={boards} user={session} /> :
        <Login error={session.error} onSubmit={this.props.requestLogin}/>}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    boards: state.boards.data,
    session: state.session.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBoards: () => {
      dispatch(getBoards());
    },
    requestLogin: (e) => {
      e.preventDefault()
      const form = e.target
      const data = serialize(form, {hash: true})      
      dispatch(requestLogin(data.email, data.password));
    },
    logout: (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    logInFromSession: () => {
      dispatch(logInFromSession());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);