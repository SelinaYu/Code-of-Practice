import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const AppBar = ({
	isAuthorized,
  username,
  accountRight,
	onLogout
}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">当淘网</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
    {
      //我的书店，用户登录导航不同
      ((isAuthorized === true) && (accountRight == 3))?
     ( 
        <NavDropdown eventKey={3} title="我的书店"  id="basic-nav-dropdown1">
          <MenuItem eventKey={3.1}>修改密码</MenuItem>
          <MenuItem eventKey={3.2}>修改个人信息</MenuItem>
          <MenuItem eventKey={3.3}>充值</MenuItem>
          <MenuItem eventKey={3.4}>我的订单</MenuItem>
        </NavDropdown>
      ):
     (
        <NavDropdown eventKey={3} title="我的书店"  id="basic-nav-dropdown1">
          <MenuItem eventKey={3.1}>修改密码</MenuItem>
          <MenuItem eventKey={3.2}>修改个人信息</MenuItem>
        </NavDropdown>
      )
   }

   {
//用户和默认情况是购物车
//管理员和店长登录是管理书店 
    (isAuthorized === false ||((isAuthorized == true) &&( accountRight ==3)))?
     
      ( <NavItem eventKey={4} href="#">购物车</NavItem>)
      :
      ( 
        ((isAuthorized === true)&&(accountRight == 1))?
       (<NavDropdown eventKey={4} title='管理书店'  id="basic-nav-dropdown2">
                 <MenuItem eventKey={4.1}>员工管理</MenuItem>
                 <MenuItem eventKey={4.2}>书店信息管理</MenuItem>  
                 <MenuItem eventKey={4.3}>书籍管理</MenuItem>        
               </NavDropdown>):
        (<NavDropdown eventKey={4} title='管理书店'  id="basic-nav-dropdown2">  
                  <MenuItem eventKey={4.3}>书籍管理</MenuItem>        
                </NavDropdown>)
      )
    }
        <NavItem eventKey={5} href="ViewBookstoreInfo">书店信息</NavItem>
      </Nav>  

      {
        //登录注册，成功后退出
        isAuthorized === false ?
        (
          <Nav pullRight>
            <NavItem eventKey={2} href="login">登录</NavItem>
            <NavItem eventKey={1} href="register">注册</NavItem>
          </Nav>
        ) :
        (
          <Nav pullRight>
           <NavItem >您好，{username}</NavItem>
            <NavItem eventKey={2} onClick={onLogout}>退出</NavItem>
          </Nav>
        )        
      }

    </Navbar.Collapse>
  </Navbar>
)
export default AppBar;