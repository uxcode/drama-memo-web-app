import React from 'react';

import MemoDetailDisplay from './MemoDetailDisplay';
import MemoDetailEdit from './MemoDetailEdit';
import {MemoData} from '../share/Models';

interface Props {
    selectedMemoData: MemoData | null;
    isEdit: boolean;
    editMemoHandler: Function;
    deleteMemoHandler: Function;
}

export default class MemoDetail extends React.Component<Props, {}> {
    render = () => {
        if (this.props.isEdit) {
            return <MemoDetailEdit selectedMemoData={this.props.selectedMemoData}/>
        } else {
            return <MemoDetailDisplay 
                        editMemoHandler={this.props.editMemoHandler}
                        deleteMemoHandler={this.props.deleteMemoHandler}
                        selectedMemoData={this.props.selectedMemoData}/>
        }
    }
}
