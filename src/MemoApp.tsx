import React from 'react';
import { Container, Row, Col} from 'reactstrap';

import {LabelData, MemoData, DEFAULT_LABEL} from './share/Models';

import LabelService from './label-list/LabelService';
import MemoService from './memo-detail/MemoService';

import LabelList from './label-list/LabelList';
import MemoList from './memo-list/MemoList';
import MemoDetail from './memo-detail/MemoDetail';
import MemoPanel from './memo-list/MemoPanel';


interface State {
	selectedLabel: LabelData;
	labelList: LabelData[];
	memoList: MemoData[];
	isMemoEdit: boolean;
	selectedMemoData: MemoData | null;
}

export default class MemoApp extends React.Component<{}, State> {
	private labelService: LabelService;
	private memoService: MemoService;

	constructor(props: any) {
		super(props)
		this.state = {selectedLabel:DEFAULT_LABEL, 
					  labelList:[DEFAULT_LABEL], 
					  memoList:[],
					  isMemoEdit: false,
					  selectedMemoData: null 
					};

		this.labelService = new LabelService();
		this.memoService = new MemoService();
	}

	componentDidMount() {
		this.labelService.getLables().then(
			(labelList: LabelData[]) => {
				this.setState({...this.state, labelList});
			});

		this.memoService.getMemos().then(
			(memoList: MemoData[]) => {
				this.setState({...this.state, memoList});
			});
	}
	
	selectLabelHandler = (selectedLabel: LabelData) => {
		this.setState({...this.state, selectedLabel});
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

	newMemoHandler = (labelData: LabelData) => {
		console.log('aadfa');
		this.setState({...this.state, isMemoEdit:true})
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
		this.memoService.deleteMemo(memoData);
	}

	render() {
		return (
			<Container fluid={true}>
				<Row>
					<Col md={2}> 
						<LabelList initSelectedLable={this.state.selectedLabel}
								   labelList={this.state.labelList}
								   selectLabelHandler={this.selectLabelHandler}
								   addLabelHandler={this.addLabelHandler}/> 
					</Col>
					<Col md={4}> 
						<MemoPanel selectedLabel={this.state.selectedLabel}
								   updateLabelHandler={this.updateLabelHandler}
								   newMemoHandler={this.newMemoHandler}/>
						<br/>
						<MemoList memoList={this.state.memoList}
								  selectMemoHandler={this.selectMemoHandler}/> 
					</Col>
					<Col md={6}> 
						<MemoDetail selectedMemoData={this.state.selectedMemoData}
									editMemoHandler={this.editMemoHandler}
									deleteMemoHandler={this.deleteMemoHandler}
									isEdit={this.state.isMemoEdit}/> 
					</Col>
				</Row>
			</Container>  
		);
	}
}
	