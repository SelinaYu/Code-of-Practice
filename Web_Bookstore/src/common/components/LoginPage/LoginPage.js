import React from 'react';
import {Form, FormGroup, Button, FormControl, ControlLabel ,Col,Media} from 'react-bootstrap';
import styles from './LoginPageStyles';
const LoginPage = (props) =>{ 
  return (
  <div>
    <Media>      
      <Media.Left align="top">
        <Col smOffset={2} mdOffset={5}>
          <img src="/static/SysImg/picture.jpg" alt="Image"/>
        </Col>
      </Media.Left>
      <Media.Body>
        <Col style={styles.login_box} mdOffset={4} smOffset={5}  sm={5} md={3}>
          <Form horizontal>
           <h3 style={styles.login_h1}>登录</h3>
           <FormGroup controlId="formBasicText">

             <Col smOffset={1}md={10} sm={10}>
            <FormControl 
            type="text" 
             defaultValue = {props.username}
            onChange={props.onChangeUsernameInput}
             placeholder="用户名"
             />
            </Col>
           </FormGroup>
           <FormGroup controlId="formBasicText">
             <Col smOffset={1}md={10} sm={10}>
            <FormControl 
            type="password" 
             defaultValue = {props.password}
            onChange={props.onChangePasswordInput}
             placeholder="密码"
             />
            </Col>
           </FormGroup> 
           
           <Button
             onClick={props.onLoginSubmit}
             bsStyle="danger"
             block
           >    提交
           </Button>
          </Form>
          </Col>
      </Media.Body>
    </Media>


    
  </div>
)};
export default LoginPage;
