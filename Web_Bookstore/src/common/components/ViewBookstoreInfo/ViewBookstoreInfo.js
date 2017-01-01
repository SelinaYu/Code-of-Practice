import React from 'react';
import { Col , Row } from 'react-bootstrap';
const BookstoreInfoPage = (props) =>{
	return 
   (<div>
      <Row>
      <Col smOffset={2} mdOffset={5}>
        <img width="500px" height="500px" src="/static/SysImg/bookstore.png" alt="Image"/>
        <h3>查看书店信息</h3>
      </Col>
      <Col smOffset={6} mdOffset={5}>
        <div>
        <label for="">店名:</label>{props.name}
        </div>
        <div>
        <label for="">地址:</label>{props.addr}
        </div>
        <div>
        <label for="">联系方式:</label>{props.tele}
        </div>
      </Col>
      </Row>
	</div>)
} 
export default BookstoreInfoPage;