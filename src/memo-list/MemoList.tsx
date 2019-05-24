import moment from 'moment';

import React from 'react';
import { Row, Col, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { MemoData } from '../share/Models';


interface Props {
    memoList: Array<MemoData>;
    selectMemoHandler: Function;
    toggleCheckMemoHandler: Function
}

interface State {
    selectedMemoId: string;
}

export default class MemoList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {selectedMemoId:''}
    }

    parseDate = (date: Date) => {
        return moment(date).fromNow();
    }

    selectMemo = (e: any) => {
        const selectedMemoId: string = e.currentTarget.name
        this.props.selectMemoHandler.call(null, selectedMemoId)
        this.setState({selectedMemoId})
    }

    check = (e: any) => {
        e.stopPropagation();
        const memoId = e.currentTarget.name;
        const isCheck = e.currentTarget.checked;
        this.props.toggleCheckMemoHandler.call(null, memoId, isCheck);
    }

    render() {
        const memoList = this.props.memoList.map((memo: MemoData) => {
            return (
                <ListGroupItem id={memo.id} key={memo.id} name={memo.id} 
                tag="button" onClick={this.selectMemo}
                active={memo.id === this.state.selectedMemoId}>
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
                        {' '}<Input name={memo.id} type="checkbox" onClick={this.check}/>
                        </Col>
                    </Row>
                </ListGroupItem>
            )});
    
        return (
            <ListGroup>{memoList}</ListGroup>
        );
    }
}
