import React from 'react';
import { Container, Row, Col} from 'reactstrap';

import {LabelData, MemoData} from './share/Models';

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
}

export default class MemoApp extends React.Component<{}, State> {
	private labelService: LabelService;
	private memoService: MemoService;

	constructor(props: any) {
		super(props)
		let defaultLabel = {
            id: 'all-memos'
            , title: 'All Memos'
        } as LabelData;

		this.state = {selectedLabel:defaultLabel, labelList:[defaultLabel], memoList:[]};

		this.labelService = new LabelService();
		this.memoService = new MemoService();
	}

	componentDidMount() {
		this.labelService.getLables().then(
			(labelList: LabelData[]) => {
				this.setState({...this.state, labelList});
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

	deleteLabelHandler = (labelId: string) => {
		console.log('label ' + labelId + ' is deleted!');
	}

	render() {
		return (
			<Container fluid={true}>
				<Row>
					<Col md={2}> 
						<LabelList labelList={this.state.labelList}
								   selectLabelHandler={this.selectLabelHandler}
								   addLabelHandler={this.addLabelHandler}
								   deleteLabelHandler={this.deleteLabelHandler}/> 
					</Col>
					<Col md={4}> 
						<MemoPanel selectedLabel={this.state.selectedLabel}
								   updateLabelHandler={this.updateLabelHandler}/>
						<MemoList memoList={[]}/> 
					</Col>
					<Col md={5}> <MemoDetail/> </Col>
				</Row>
			</Container>  
		);
	}
}
	