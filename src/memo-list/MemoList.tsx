import moment from 'moment';

import React from 'react';
import { Row, Col, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { MemoData } from '../share/Models';


interface Props {
    memoList: Array<MemoData>;
    checkedMemoIds: string[];
    selectedMemoData: MemoData | null;
    selectMemoHandler: Function;
    toggleCheckMemoHandler: Function
}

export default class MemoList extends React.Component<Props, {}> {

    parseDate = (date: Date) => {
        return moment(date).fromNow();
    }

    selectMemo = (e: any) => {
        const selectedMemoId: string = e.currentTarget.name
        this.props.selectMemoHandler.call(null, selectedMemoId)
        this.setState({selectedMemoId})
    }

    check = (e: any) => {
        const memoId = e.currentTarget.name;
        const isCheck = e.currentTarget.checked;
        this.props.toggleCheckMemoHandler.call(null, memoId, isCheck);
    }

    clickCheckbox = (e: any) => {
        e.stopPropagation();
    }

    couldActive = (memoId: string): boolean => {
        return this.props.selectedMemoData !== null && memoId === this.props.selectedMemoData.id
    }

    render() {
        let memoList: any;
        if (this.props.memoList.length) {
            memoList = this.props.memoList.map((memo: MemoData) => {
                return (
                    <ListGroupItem id={memo.id} key={memo.id} name={memo.id} 
                        tag="button" onClick={this.selectMemo}
                        active={this.couldActive(memo.id)}>
                        <Row>
                            <Col>
                                <Row>
                                    <ListGroupItemHeading>{memo.title}</ListGroupItemHeading>
                                    <span>&nbsp;&nbsp;&#124;&nbsp;</span>
                                    <ListGroupItemText>{this.parseDate(memo.updatedAt)}</ListGroupItemText>
                                </Row>
                                <Row>
                                    <ListGroupItemText>{memo.content}</ListGroupItemText>
                                </Row>
                            </Col>
                            <Col md={1}>
                                {' '}
                                <Input name={memo.id} type="checkbox"
                                    onChange={this.check}
                                    checked={this.props.checkedMemoIds.indexOf(memo.id) >= 0}
                                    onClick={this.clickCheckbox}/>
                            </Col>
                        </Row>
                    </ListGroupItem>
                )});
        } else {
            return <div>No memos with this label</div>
        }
    
        return (
            <ListGroup>{memoList}</ListGroup>
        );
    }
}
