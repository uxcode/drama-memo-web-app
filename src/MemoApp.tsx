import React from 'react';
import Header from './header/Header'
import LabelList from './label-list/LabelList'
import MemoList from './memo-list/MemoList'
import MemoDetail from './memo-detail/MemoDetail'
import { Container, Row, Col, Breadcrumb } from 'reactstrap';

const MemoApp: React.FC = () => {
  return (
    <Container fluid={true}>
      <Row><Col md={12}>
        <Header></Header>
      </Col></Row>
      <Row>
        <Col md={2}> <LabelList/> </Col>
        <Col md={4}> <MemoList/> </Col>
        <Col md={5}> <MemoDetail/> </Col>
      </Row>
    </Container>  
  );
}

export default MemoApp;
