import React from 'react';
import { Col,Form,FormGroup,FormControl,Button,ControlLabel,Radio } from'react-bootstrap';
import styles from './ChangePersonalInfoStyles';
const ChangePersonalInfoPage = (props) => (
  <div>
<Col style={styles.personal_Box}>
  <Col  sm={4} md ={4} smOffset={4} mdOffset={4}>
    <img width="150px" src="/static/SysImg/password.png" alt="Image"/>
    <h3>修改个人信息</h3>
  </Col>
  <Form horizontal>
    <FormGroup>
      <Col  sm={1} md ={1} smOffset={4} mdOffset={4}>
        <ControlLabel>账户ID:</ControlLabel>
      </Col>
      <Col sm={1} md={2}>
	      <FormControl.Static>
	        {props.accountID}
	      </FormControl.Static>         
      </Col>
    </FormGroup>  
    <FormGroup type="text"  controlId="formBasicText">
      <Col sm={1} md ={1} smOffset={4} mdOffset={4}>
        账户名：
      </Col>
      <Col sm={1} md={2}>
	      <FormControl 
	      type="text" 
	      defaultValue ={props.username}
	      onChange={props.onChangeUsernameInput}
	       placeholder="账户名"
	       />        
      </Col>
    </FormGroup> 
   <FormGroup onChange={props.onChangeSexInput} defaultValue ={props.sex}>
      <Col sm={1} md ={1} smOffset={4} mdOffset={4}>
        性别：
      </Col>   
    <Col sm={1} md={2} style={styles.sex_box}>
    <Radio inline name="sex" value="男" >
      男
    </Radio>
    <Radio inline name="sex" value="女" >
      女
    </Radio>
    </Col>
   </FormGroup> 
    <FormGroup type="text" controlId="formBasicText">
      <Col sm={1} md ={1} smOffset={4} mdOffset={4}>
        联系方式：
      </Col>
      <Col sm={1} md={2}>
	      <FormControl 
	      type="text" 
	      defaultValue ={props.tel}
	      onChange={props.onChangeTelInput}
	       placeholder="联系方式"
	       />        
      </Col>
    </FormGroup>   
  <Col sm={2} md ={3} smOffset={4} mdOffset={4}> 
   <Button
     onClick={props.onChangePersonalInfoSubmit}
     bsStyle="danger"
     block
   >    确定
   </Button>
  </Col>
  </Form>
    </Col>
  </div>
);
export default ChangePersonalInfoPage;