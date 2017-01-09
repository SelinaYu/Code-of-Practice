import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const AppBar = (props) => (
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
      ((props.isAuthorized === true) && (props.accountRight == 3))?
     ( 
        <NavDropdown eventKey={3} title="我的书店"  id="basic-nav-dropdown1">
          <MenuItem eventKey={3.1} onSelect={props.onChangePassword}>修改密码</MenuItem>
          <MenuItem eventKey={3.2} onSelect={props.onChangePersonalInfo}>修改个人信息</MenuItem>
          <MenuItem eventKey={3.3} onSelect={props.onRecharge}>充值</MenuItem>
          <MenuItem eventKey={3.4} onSelect={props.onOrder}>我的订单</MenuItem>
        </NavDropdown>
      ):
     (
        <NavDropdown eventKey={3} title="我的书店"  id="basic-nav-dropdown1">
          <MenuItem eventKey={3.1} href='account/changePassword'>修改密码</MenuItem>
          <MenuItem eventKey={3.2} href='account/changePersonalInfo'>修改个人信息</MenuItem>
        </NavDropdown>
      )
   }

   {
//用户和默认情况是购物车
//管理员和店长登录是管理书店 
    (props.isAuthorized === false ||((props.isAuthorized == true) &&( props.accountRight ==3)))?
     
      ( <NavItem eventKey={4} onClick={props.onBuyCar}>购物车</NavItem>)
      :
      ( 
        ((props.isAuthorized === true)&&(props.accountRight == 1))?
       (<NavDropdown eventKey={4} title='管理书店'  id="basic-nav-dropdown2">
                 <MenuItem eventKey={4.1} onSelect={props.onManageStaff}>员工管理</MenuItem>
                 <MenuItem eventKey={4.2} onSelect={props.onManageBookstore}>书店信息管理</MenuItem>  
                 <MenuItem eventKey={4.3} onSelect={props.onManageBook}>书籍管理</MenuItem>        
               </NavDropdown>):
        (<NavDropdown eventKey={4} title='管理书店'  id="basic-nav-dropdown2">  
                  <MenuItem eventKey={4.3} onSelect={props.onManageBook}>书籍管理</MenuItem>        
                </NavDropdown>)
      )
    }
        <NavItem eventKey={5} onClick={props.onBookstore}>书店信息</NavItem>
      </Nav>  

      {
        //登录注册，成功后退出
        props.isAuthorized === false ?
        (
          <Nav pullRight>
            <NavItem eventKey={2} href="login">登录</NavItem>
            <NavItem eventKey={1} href="register">注册</NavItem>
          </Nav>
        ) :
        (
          <Nav pullRight>
           <NavItem >您好，{props.username}</NavItem>
            <NavItem eventKey={2} onClick={props.onLogout}>退出</NavItem>
          </Nav>
        )        
      }

    </Navbar.Collapse>
  </Navbar>
)
export default AppBar;