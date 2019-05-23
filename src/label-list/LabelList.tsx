import React from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem, Input, Form, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';

export default class LableList extends React.Component {
    render() {
        return (
            <div>
                <Row><Col md={12}> 
                    <ListGroup>
                        <ListGroupItem>label 1</ListGroupItem>
                        <ListGroupItem>label 2</ListGroupItem>
                        <ListGroupItem>label 3</ListGroupItem>
                    </ListGroup>    
                </Col></Row>
                <br/>
                <InputGroup>
                    <Input type="text" name="lable" placeholder="Add Label"></Input>
                    <InputGroupAddon addonType="append"><Button color="info">{"+"}</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}
