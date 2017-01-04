import React from 'react';
import { Col , Row } from 'react-bootstrap';
import styles from './ViewBookstoreInfoStyles';

const ViewBookstoreInfo = (props) => 
   (
    <div>
    <Row style={styles.info_box}>
      <Col smOffset={2} mdOffset={3} md={3} sm={3} style={styles.bookstore_imgbox}>
        <img src="/static/SysImg/bookstore.png" alt="Image"/>
        <h3>查看书店信息</h3>
      </Col>
      <Col  md={3} sm={3} style={styles.bookstore_info}>
        <div>
        店名: {props.name}
        </div>
        <div>
        地址: {props.addr}
        </div>
        <div>
        联系方式:{props.tele}
        </div>
      </Col>
      </Row>
	</div>
  )
export default ViewBookstoreInfo;