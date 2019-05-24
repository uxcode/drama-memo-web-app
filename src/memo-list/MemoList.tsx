import moment from 'moment';

import React from 'react';
import { Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { MemoData } from '../share/Models';


interface Props {
    memoList: Array<MemoData>;
    selectMemoHandler: Function;
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
        let selectedMemoId: string = e.currentTarget.name
        this.props.selectMemoHandler.call(null, selectedMemoId)
        this.setState({selectedMemoId})
    }

    render() {
        const memoList = this.props.memoList.map((memo: MemoData) => {
            return (
                <ListGroupItem id={memo.id} key={memo.id} name={memo.id} 
                tag="button" onClick={this.selectMemo}
                active={memo.id === this.state.selectedMemoId}>
                    <Row>
                        <ListGroupItemHeading>{memo.title}</ListGroupItemHeading>
                        <span>&nbsp;&nbsp;&#124;&nbsp;</span>
                        <ListGroupItemText>{this.parseDate(memo.updatedAt)}</ListGroupItemText>
                    </Row>
                    <Row>
                        <ListGroupItemText>{memo.content}</ListGroupItemText>
                    </Row>
                </ListGroupItem>
            )});
    
        return (
            <ListGroup>{memoList}</ListGroup>
        );
    }
}
