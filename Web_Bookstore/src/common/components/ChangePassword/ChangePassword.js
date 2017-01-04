import React from 'react';
import { Col,Form,FormGroup,FormControl,Button} from 'react-bootstrap';
import styles from './ChangePasswordStyles';

 const  ChangePasswordPage = (props) => (
<div>
  <Col style = {styles.changePasswordBox}>
  <Col  sm={3} md ={4} smOffset={4} mdOffset={4} style={styles.passwordImg}>
    <img width="200px" src="/static/SysImg/password.png" alt="Image"/>
    <h3>修改密码</h3>
  </Col>
    <Form horizontal>
    <FormGroup controlId="formHorizontalPassword">
      <Col  sm={1} md ={1} smOffset={4} mdOffset={4}>
        当前密码
      </Col>
      <Col sm={2} md={3}>
        <FormControl type="password" 
        defaultValue ={props.inputPassword} 
        onChange={props.onChangeInputPassword}
        placeholder="当前密码" />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col  sm={1} md ={1} smOffset={4} mdOffset={4}>
        新密码
      </Col>
      <Col sm={2} md={3}>
        <FormControl type="password"
         defaultValue ={props.newPassword} 
        onChange={props.onChangeNewPassword}
         placeholder="新密码" />
      </Col>
    </FormGroup>

     <FormGroup controlId="formHorizontalPassword">
      <Col  sm={1} md ={1} smOffset={4} mdOffset={4}>
        确认密码
      </Col>
      <Col sm={2} md={3}>
        <FormControl type="password" 
        defaultValue ={props.reNewPassword} 
        onChange={props.onChangereNewPassword}
        placeholder="确认密码" />
      </Col>
    </FormGroup>
    <Col  sm={3} md ={4} smOffset={4} mdOffset={4}>
     <Button
     onClick={props.onChangePasswordSubmit}
     bsStyle="danger"
     bsSize="large"
     block
   >    提交
   </Button>
   </Col>
    </Form>

  </Col>
</div>
 )
 export default ChangePasswordPage;