import React from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Input, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export default class MemoList extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <ListGroupItemHeading>{"title 1"}</ListGroupItemHeading>
                        <span>&nbsp;&nbsp;&#124;&nbsp;</span>
                        <ListGroupItemText>{"2019-04-03"}</ListGroupItemText>
                    </Row>
                    <Row>
                        <ListGroupItemText>{"trimed body"}</ListGroupItemText>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <ListGroupItemHeading>{"title 2"}</ListGroupItemHeading>
                        <span>&nbsp;&nbsp;&#124;&nbsp;</span>
                        <ListGroupItemText>{"2019-04-03"}</ListGroupItemText>
                    </Row>
                    <Row>
                        <ListGroupItemText>{"trimed body asfsdf asdf sadfasd f..."}</ListGroupItemText>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}
