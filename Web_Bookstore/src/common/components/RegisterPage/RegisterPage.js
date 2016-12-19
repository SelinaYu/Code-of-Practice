import React from 'react';
import {Form, FormGroup, Button, FormControl, ControlLabel ,Col,Media,Radio} from 'react-bootstrap';
import styles from './RegisterPageStyles';
const RegisterPage = (props) => {
	 return (<div>
    <Media>      
      <Media.Left align="top">
        <Col smOffset={2} mdOffset={5}>
          <img src="/static/SysImg/picture.jpg" alt="Image"/>
        </Col>
      </Media.Left>
      <Media.Body>
        <Col style={styles.register_box} mdOffset={4} smOffset={5}  sm={5} md={3}>
          <Form horizontal>
           <h3 style={styles.register_h1}>注册</h3>
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
            defaultValue={props.password}
            onChange={props.onChangePasswordInput}
             placeholder="输入密码"
             />
            </Col>
           </FormGroup>  
           <FormGroup controlId="formBasicText">
             <Col smOffset={1}md={10} sm={10}>
            <FormControl 
            type="text" 
            defaultValue ={props.tel}
            onChange={props.onChangeTelInput}
             placeholder="电话号码"
             />
            </Col>
           </FormGroup> 
           <FormGroup onChange={props.onChangeSexInput} defaultValue ={props.sex}>
            <Col smOffset={1}md={10} sm={10}>
			      <Radio inline name="sex" value="男" style={styles.sex_box}>
			        男
			      </Radio>
			      <Radio inline name="sex" value="女" >
			        女
			      </Radio>
			      </Col>
           </FormGroup>
           <Button
             onClick={props.onRegisterSumbit}
             bsStyle="danger"
             block
           >    注册
           </Button>
          </Form>
          </Col>
      </Media.Body>
    </Media>

  </div>
)};
export default RegisterPage;