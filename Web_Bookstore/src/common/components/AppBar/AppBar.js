import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const AppBar = ({
	isAuthorized,
	onLogout
}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">当淘网</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {
        isAuthorized === false ?
        (
          <Nav pullRight>
            <NavItem eventKey={2} href="login">登录</NavItem>
            <NavItem eventKey={1} href="register">注册</NavItem>
          </Nav>
        ) :
        (
          <Nav pullRight>
            <NavItem eventKey={2} onClick={onLogout} href="#">退出</NavItem>
          </Nav>
        )        
      }

    </Navbar.Collapse>
  </Navbar>
)
export default AppBar;