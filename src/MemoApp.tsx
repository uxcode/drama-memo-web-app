import React from 'react';
import { Container, Row, Col} from 'reactstrap';

import {LabelData, MemoData, DEFAULT_LABEL} from './share/Models';

import LabelService from './label-list/LabelService';
import MemoService from './memo-detail/MemoService';

import LabelList from './label-list/LabelList';
import MemoList from './memo-list/MemoList';
import MemoDetail from './memo-detail/MemoDetail';
import MemoPanel from './memo-list/MemoPanel';
import { statement } from '@babel/template';

interface State {
	selectedLabel: LabelData;
	labelList: LabelData[];
	memoList: MemoData[];
	isMemoEdit: boolean;
	selectedMemoData: MemoData | null;
	checkedMemoIds: string[];
}

export default class MemoApp extends React.Component<{}, State> {
	private labelService = new LabelService();
	private memoService = new MemoService();
	private allMemoList: MemoData[] = [];

	constructor(props: any) {
		super(props)
		this.state = {selectedLabel:DEFAULT_LABEL, 
					  labelList:[DEFAULT_LABEL], 
					  memoList:[],
					  isMemoEdit: false,
					  selectedMemoData: null,
					  checkedMemoIds: []
					};
	}

	componentDidMount() {
		this.labelService.getLables().then(
			(labelList: LabelData[]) => {
				this.setState({...this.state, labelList});
			});

		this.memoService.getMemos().then(
			(memoList: MemoData[]) => {
				this.allMemoList = memoList
				this.setState({...this.state, memoList});
			});
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
		if (memoData !== null) {
			if ( memoList.find(memoData => memoData.id === memoData.id) == undefined) {
				selectedMemoData = null;
			}
		}

		this.setState({...this.state, selectedLabel, memoList, selectedMemoData});
	}

	addLabelHandler = (label: LabelData) => {
		let labelList = this.state.labelList;
		labelList.push(label);
		this.setState({...this.state, labelList});
	}

	updateLabelHandler = (label: LabelData) => {
		let labelList: LabelData[] = this.state.labelList;
		for (var i=0; i < labelList.length; i++) {
			let selectedLabel = labelList[i];
			if (selectedLabel.id === label.id) {
				labelList[i] = label;
				break;
			} 
		}
		this.setState({...this.state, 
						labelList, 
						selectedLabel: labelList[i]});
	}

	deleteLabelHandler = (label: LabelData) => {
		this.labelService.deleteLabel(label.id)
		.then( (deletedLabel: LabelData) => {
			let labelList = this.state.labelList;
			for (let i=0; i < labelList.length; i++) {
				if (labelList[i].id === deletedLabel.id){
					labelList.splice(i, 1);
					break;
				}
			}
			this.setState({...this.state, labelList, selectedLabel: DEFAULT_LABEL});
		});
	}

	newMemoHandler = (labelData: LabelData) => {
		this.setState({...this.state, selectedMemoData:null, isMemoEdit:true})
	}

	selectMemoHandler = (selectedMemoId: String) => {
		const memos: MemoData[] = this.state.memoList;
		let selectedMemoData = memos.find(item => item.id === selectedMemoId );
		if (selectedMemoData) this.setState({...this.state, selectedMemoData, isMemoEdit:false});
	}

	editMemoHandler = (memoData: MemoData) => {
		this.setState({...this.setState, isMemoEdit:true});
	}

	deleteMemoHandler = (memoData: MemoData) => {
		this.memoService.deleteMemo(memoData)
		.then((deletedMemo:MemoData)=>{
			let memoList = this.state.memoList;
			for (let i=0; i < memoList.length; i++) {
				let existMemo = memoList[i];
				if (existMemo.id === deletedMemo.id) {
					memoList.splice(i, 1);
					break;
				}
			}

			this.setState({...this.state, memoList, selectedMemoData:null});
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

	tagLabelHandler = (labelId: string) => {
		let checkedMemoIds = this.state.checkedMemoIds;
		let memoIds: string[];
		if (checkedMemoIds.length > 0) {
			memoIds = checkedMemoIds;
		} else if (this.state.selectedMemoData) {
			memoIds = [this.state.selectedMemoData.id];
		} else {
			console.warn('There is not selected Memos');
			return;
		}

		this.labelService.addMemosOnTheLabel(labelId, memoIds)
		.then( (labelData: LabelData) => {
			let labelList = this.state.labelList;
			for (let i=0; i < labelList.length; i++) {
				if (labelList[i].id === labelData.id) {
					labelList[i] = labelData;
				}
			}
			let memoList: MemoData[];
			if (labelData.memos) {
				memoList = labelData.memos;
			} else {
				memoList = [];
			}
			this.setState({...this.state, selectedLabel: labelData, labelList, memoList, checkedMemoIds:[]})
		});
	}

	unTagLabelHandler = (labelId: String) => {
		let checkedMemoIds = this.state.checkedMemoIds;
		let memoIds: string[];
		if (checkedMemoIds.length > 0) {
			memoIds = checkedMemoIds;
		} else if (this.state.selectedMemoData) {
			memoIds = [this.state.selectedMemoData.id];
		} else {
			console.warn('There is not selected Memos');
			return;
		}

		this.labelService.removeMemosFromTheLabel(labelId, memoIds)
		.then((labelData: LabelData) => {
			let labelList = this.state.labelList;
			for (let i=0; i < labelList.length; i++) {
				if (labelList[i].id === labelData.id) {
					labelList[i] = labelData;
				}
			}
			let memoList: MemoData[];
			if (labelData.memos) {
				memoList = labelData.memos;
			} else {
				memoList = [];
			}
			this.setState({...this.state, selectedLabel: labelData, labelList, memoList, checkedMemoIds:[]})
		});
	}

	createMemoHandler = (memoData: MemoData) => {
		this.allMemoList.push(memoData);

		let memoList;
		if (this.state.selectedLabel.id === DEFAULT_LABEL.id) {
			memoList = this.allMemoList;
		} else {
			memoList = this.state.memoList;
		}

		this.setState({...this.state, memoList, selectedMemoData: memoData, isMemoEdit: false});
	}

	updateMemoHandler = (memoData: MemoData) => {
		this.updateMemoDataInList(memoData, this.allMemoList);
		
		let labelList = this.state.labelList;
		for (let labelData of labelList) {
			if (labelData.memos)
				this.updateMemoDataInList(memoData, labelData.memos)
		}

		this.setState({...this.state, labelList, isMemoEdit: false});
	}

	updateMemoDataInList(memoData: MemoData, memoList: MemoData[]) {
		for (let i=0; i < memoList.length; i++) {
			if (memoData.id === memoList[i].id) {
				memoList[i] = memoData;
			}
		}
	}

	render() {
		return (
			<Container fluid={true}>
				<Row>
					<Col md={2}> 
						<LabelList initSelectedLable={this.state.selectedLabel}
								   labelList={this.state.labelList}
								   selectedLabel={this.state.selectedLabel}
								   selectLabelHandler={this.selectLabelHandler}
								   addLabelHandler={this.addLabelHandler}/> 
					</Col>
					<Col md={4}> 
						<MemoPanel selectedLabel={this.state.selectedLabel}
								   labelList={this.state.labelList}
								   updateLabelHandler={this.updateLabelHandler}
								   newMemoHandler={this.newMemoHandler}
								   deleteLabelHandler={this.deleteLabelHandler}
								   tagLabelHandler={this.tagLabelHandler}
								   unTagLabelHandler={this.unTagLabelHandler}/>
						<br/>
						<MemoList memoList={this.state.memoList}
								  selectedMemoData={this.state.selectedMemoData}
								  selectMemoHandler={this.selectMemoHandler}
								  toggleCheckMemoHandler={this.toggleCheckMemoHandler}
								  checkedMemoIds={this.state.checkedMemoIds}/> 
					</Col>
					<Col md={6}> 
						<MemoDetail selectedMemoData={this.state.selectedMemoData}
									editMemoHandler={this.editMemoHandler}
									deleteMemoHandler={this.deleteMemoHandler}
									isEdit={this.state.isMemoEdit}
									createMemoHandler={this.createMemoHandler}
									updateMemoHandler={this.updateMemoHandler}/> 
					</Col>
				</Row>
			</Container>  
		);
	}
}
	