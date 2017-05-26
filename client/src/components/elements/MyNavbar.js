import React from 'react';
// import {Link, withRouter} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const navUser = (user) => {
	if (!user || !Object.keys(user).length) {
		return null;
	}
	return (
	    <NavItem>
	      <NavLink href="/">{user.email}</NavLink>
	    </NavItem>
	)
}

// const navLogout = (user) => {
// 	if (!user || !Object.keys(user)) {
// 		return null;
// 	}
// 	return (
// 	    <NavItem>
// 	      <Button onClick={() => {localStorage.setItem("sessionId", "");}}>Log Out</Button>
// 	    </NavItem>	
// 	)
// }

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Djello</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            	{navUser(this.props.user)}
            	<NavItem>
					      
                <NavLink href="/" onClick={this.props.logout}>Log Out</NavLink>
					    </NavItem>	
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;