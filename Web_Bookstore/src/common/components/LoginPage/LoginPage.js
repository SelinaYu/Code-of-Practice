import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
const LoginPage = ({
	spinnerVisible
}) => (
  <div>
    <Row className="show-grid">
      <Col xs={6} xsOffset={3}>
        { spinnerVisible === true ?
          <Image src="/static/images/loading.gif" /> :
          null
        }
      </Col>
    </Row>
  </div>
)