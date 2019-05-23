import React from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Input, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export default class MemoDetailEdit extends React.Component {
    render() {
        return (
            <div>
                <p><h1>Display</h1></p>
                <dl className="row">
                    <dt className="col-sm-3">Description lists</dt>
                    <dd className="col-sm-9">A description list is perfect for defining terms.</dd>
                </dl>
                <p>memo body asdfasd  adf a asd asdfsadf sd s    asdfas asdfsadf </p>
            </div>
        );
    }
}
 