import moment from 'moment';

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { MemoData } from '../../share/Models';


interface Props {
    memoList: Array<MemoData>;
    checkedMemoIds: string[];
    selectedMemoData: MemoData | undefined;
    toggleCheckMemoHandler: Function
    location:any
}

export default class MemoList extends React.Component<Props, {}> {

    parseDate = (date: Date) => {
        return moment(date).fromNow();
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
        return this.props.selectedMemoData !== undefined && memoId === this.props.selectedMemoData.id
    }

    getLinkToUrl = (memoId: string) => {
        // ${this.props.match.url}/memo/${memo.id}
        let url = this.props.location.pathname;
        
        const path: string[] = url.split('/');
        const matchIndex = path.indexOf('memo');
        if ( matchIndex > -1) {
            path[path.length-1] = memoId;
            return path.join('/');
        } else {
            return url + "/memo/" + memoId; 
        }
    }

    render() {
        let memoList: any;
        if (this.props.memoList.length) {
            memoList = this.props.memoList.map((memo: MemoData) => {
                return (
                    <Link to={this.getLinkToUrl(memo.id)} key={memo.id} >
                        <ListGroupItem className="container-fluid" tag="button"
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
                    </Link>
                )});
        } else {
            return <div>No memos with this label</div>
        }
    
        return (
            <ListGroup>{memoList}</ListGroup>
        );
    }
}
