import moment from 'moment';
import React from 'react';
import { Button, Row, Col } from 'reactstrap';

import { MemoData } from '../share/Models';

interface Props {
    selectedMemoData: MemoData | null;
    editMemoHandler: Function;
    deleteMemoHandler: Function;
}

export default class MemoDetailDisplay extends React.Component<Props, {}> {
    
    parseDate = (date: Date) => {
        return moment(date).fromNow();
    }

    editMemo = () => {
        this.props.editMemoHandler.call(null, this.props.selectedMemoData)
    }

    deleteMemo = () => {
        this.props.deleteMemoHandler.call(null, this.props.selectedMemoData)
    }

    render () {
        if ( this.props.selectedMemoData) {
            let memoData = this.props.selectedMemoData as MemoData;
            return (
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col md={9}>
                            <Row>
                                <h1>{memoData.title}</h1>
                            </Row>
                            <Row>
                                <dl className="row">
                                    <dt className="col-sm-4">Last modified</dt>
                                    <dd className="col-sm-8">{this.parseDate(memoData.updatedAt)}</dd>
                                </dl>
                            </Row>
                        </Col>
                        <Col md={3} className="text-right">
                            <Button onClick={this.editMemo} color="info"><span className="fas fa-edit"></span></Button>
                            {' '}
                            <Button onClick={this.deleteMemo} color="danger"><span className="fas fa-trash-alt"></span></Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <p>{memoData.content}</p>
                    </Row>
                </div>
            );
        } else {
            return <h3>No memo selected</h3>
        }
    }
}
