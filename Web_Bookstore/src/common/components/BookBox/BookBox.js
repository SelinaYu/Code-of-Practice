import React from 'react';
import { Media, Button,Col , Row, Panel} from 'react-bootstrap';

const BookBox = (props) => {
	return (
		
	<Row className="show-grid">

  <Col md={6} mdOffset={3} sm={8} smOffset={2} >
  	<Panel>
    <Media>
     <Media.Left>
        <img width={80} height={80} src={props.book.get('bookUrl')} alt="Image"/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>{props.book.get('bookName')}</Media.Heading>
        <p>{props.book.get('bookWriter')}</p>
      </Media.Body>
      <Media.Right>
         <Button bsStyle="danger" onClick={props.onTakeToCar(props.book.get('bookID'))}>加入购物车</Button>
      </Media.Right>
    </Media>

   </Panel>
  </Col>
   </Row>
	)
}
export default BookBox;