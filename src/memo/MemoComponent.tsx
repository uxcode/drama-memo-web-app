import React from 'react';
import { Row, Col} from 'reactstrap';

import { MemoData, LabelData, DEFAULT_LABEL } from '../share/Models';
import MemoService from './MemoService';
import LabelService from '../label/LabelService';
import MemoList from './list/MemoList';
import MemoDetail from './detail/MemoDetail';
import MemoPanel from './list/MemoPanel';

interface Props {
    selectedLabel: any;
    labelList: any;

    updateLabelHandler: Function;

    match?: any;
    history?: History;
    location?: Location;
}

interface State {
    memoList: MemoData[];
    selectedMemoData: MemoData | undefined;
    checkedMemoIds: string[];
    isMemoEdit: boolean;
}

export default class MemoContainer extends React.Component<Props, State> {
    private allMemoList: MemoData[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            memoList: []
            , selectedMemoData: undefined
            , checkedMemoIds: []
            , isMemoEdit:  false
        }
    }

    componentDidMount() {
		MemoService.getMemos().then(
			(memoList: MemoData[]) => {
				this.allMemoList = memoList
				this.setState({...this.state, memoList});
			});
		
    }

    componentDidUpdate = (prevProps: Props) => {
        if ( prevProps.selectedLabel !== this.props.selectedLabel ) {
            this.selectLabelHandler(this.props.selectedLabel);
        }

        if (prevProps.location !== this.props.location && this.props.location) {
            const memoId = this.getMemoIdFromRoute(this.props.location);
            this.selectMemoHandler(memoId);
        }
    }

    getMemoIdFromRoute = (location: any): string => {
		if (location) {
            const path: string[] = location.pathname.split('/');
            const matchIndex = path.indexOf('memo');
            if ( matchIndex > -1 && path.length > matchIndex ) {
                return path[matchIndex+1];
            }
		}
		return '';
	}

    selectLabelHandler = (selectedLabel: LabelData) => {
		let memoList: MemoData[];
		if (selectedLabel.id === DEFAULT_LABEL.id) {
			memoList = this.allMemoList;
		}
		else if (selectedLabel.memos) {
			memoList = selectedLabel.memos;
		} else {
			memoList = [];
		}
		
		let selectedMemoData = this.state.selectedMemoData;
		const memoData = this.state.selectedMemoData;
		if (memoData !== undefined) {
			if ( memoList.find(memoItem => memoItem.id === memoData.id) === undefined) {
				selectedMemoData = undefined;
			}
		}

		this.setState({...this.state, selectedMemoData, memoList});
	}
    
    selectMemoHandler = (memoId: String) => {
        let selectedMemoData: MemoData | undefined;
            if (memoId.length) {
                selectedMemoData = this.state.memoList.find(item=>item.id === memoId);
            } else {
                selectedMemoData = undefined;
            }
            this.setState({...this.state, selectedMemoData, isMemoEdit: false});
    }
    
    newMemoModeHandler = (labelData: LabelData) => {
		this.setState({...this.state, selectedMemoData: undefined, isMemoEdit: true})
	}

	editMemoModeHandler = (memoData: MemoData) => {
		this.setState({...this.setState, isMemoEdit:true});
	}

	deleteMemoHandler = (memoData: MemoData) => {
		MemoService.deleteMemo(memoData)
		.then((deletedMemo:MemoData)=>{
			let memoList = this.state.memoList;
			for (let i=0; i < memoList.length; i++) {
				let existMemo = memoList[i];
				if (existMemo.id === deletedMemo.id) {
					memoList.splice(i, 1);
					break;
				}
			}

			this.setState({...this.state, memoList, selectedMemoData: undefined});
		});
	}

    toggleCheckMemoHandler = (memoId: string, isCheck:boolean) => {
		let checkedMemoIds = this.state.checkedMemoIds;
		if (isCheck) {
			checkedMemoIds.push(memoId);
		} else {
			let removingIndex = checkedMemoIds.indexOf(memoId);
			checkedMemoIds.splice(removingIndex, 1);	
		}

		this.setState({...this.state, checkedMemoIds});
	}
    
    createMemoHandler = (memoData: MemoData) => {
		this.allMemoList.push(memoData);

		let memoList;
		if (this.props.selectedLabel.id === DEFAULT_LABEL.id) {
            memoList = this.allMemoList;
            this.setState({...this.state, memoList, selectedMemoData: memoData, isMemoEdit: false});
		} else {
            this.tagLabelHandler(this.props.selectedLabel.id, [memoData.id]);
        }
	}

	updateMemoHandler = (memoData: MemoData) => {
		this.updateMemoDataInList(memoData, this.allMemoList);
		
		let labelList = this.props.labelList;
		for (let labelData of labelList) {
			if (labelData.memos)
				this.updateMemoDataInList(memoData, labelData.memos)
		}

		this.setState({...this.state, isMemoEdit: false, selectedMemoData: memoData});
    }
    
    updateMemoDataInList(memoData: MemoData, memoList: MemoData[]) {
		for (let i=0; i < memoList.length; i++) {
			if (memoData.id === memoList[i].id) {
				memoList[i] = memoData;
			}
		}
    }
    
    tagLabelHandler = (labelId: string, checkedMemoIds: string[]) => {
		if (checkedMemoIds && checkedMemoIds.length === 0 && this.state.selectedMemoData) {
			checkedMemoIds = [this.state.selectedMemoData.id];
		} else {
            console.warn('There is not selected Memos');
			return;
        }

		LabelService.addMemosOnTheLabel(labelId, checkedMemoIds)
		.then( (labelData: LabelData) => {
            this.setState({...this.state, checkedMemoIds:[]});
            this.props.updateLabelHandler(labelData);
		});
	}

	unTagLabelHandler = (labelId: string, checkedMemoIds: string[]) => {
		if (checkedMemoIds && checkedMemoIds.length === 0 && this.state.selectedMemoData) {
			checkedMemoIds = [this.state.selectedMemoData.id];
		} else {
            console.warn('There is not selected Memos');
			return;
        }

		LabelService.removeMemosFromTheLabel(labelId, checkedMemoIds)
		.then((labelData: LabelData) => {
            this.setState({...this.state, checkedMemoIds:[]});
            this.props.updateLabelHandler(labelData);
		});
	}

    render() {
        return (
            <Row>
                <Col md={4}> 
                    <MemoPanel selectedLabel={this.props.selectedLabel}
                        labelList={this.props.labelList}
                        updateLabelHandler={this.props.updateLabelHandler}
                        newMemoModeHandler={this.newMemoModeHandler}
                        tagLabelHandler={this.tagLabelHandler}
                        unTagLabelHandler={this.unTagLabelHandler}
                        checkedMemoIds={this.state.checkedMemoIds}/>
                    <br/>
                    <MemoList memoList={this.state.memoList}
                        selectedMemoData={this.state.selectedMemoData}
                        toggleCheckMemoHandler={this.toggleCheckMemoHandler}
                        checkedMemoIds={this.state.checkedMemoIds}
                        match={this.props.match}/> 
                </Col>
                <Col md={6}>
                    {this.renderMemoDetail()}
                </Col>
            </Row>
        );
    }

    renderMemoDetail() {
        if (this.state.selectedMemoData === undefined && !this.state.isMemoEdit) {
            return (<h3>No memo selected</h3>);
        } else {
            return (
                <MemoDetail selectedMemoData={this.state.selectedMemoData}
                    isEdit={this.state.isMemoEdit}
                    editModeMemoHandler={this.editMemoModeHandler}
                    deleteMemoHandler={this.deleteMemoHandler}
                    createMemoHandler={this.createMemoHandler}
                    updateMemoHandler={this.updateMemoHandler}/>
            );
        }
    }
}