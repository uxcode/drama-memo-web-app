import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import {LabelData, MemoData, DEFAULT_LABEL} from './share/Models';

import LabelService from './label-list/LabelService';
import LabelList from './label-list/LabelList';
import MemoListContainer from './memo-list/MemoListContainer';

interface State {
	selectedLabel: LabelData;
	labelList: LabelData[];
}

interface Props {
	match?:any;
	history?:any;
	location?:any;
}

export default class MemoApp extends React.Component<Props, State> {
	private labelService = new LabelService();

	constructor(props: Props) {
		super(props)
		this.state = {selectedLabel:DEFAULT_LABEL
					  , labelList:[DEFAULT_LABEL]
					};
	}

	componentDidMount() {
		this.labelService.getLables().then(
			(labelList: LabelData[]) => {
				let selectedLabel = this.getSelectLabelFromRoute(labelList);
				this.setState({...this.state, labelList, selectedLabel});
			});
	}

	componentDidUpdate(prevProp: Props) {
		if (prevProp.match !== this.props.match) {
			this.selectLabelHandler(this.getSelectLabelFromRoute(this.state.labelList));
		}
	}
	
	getSelectLabelFromRoute = (labelList: LabelData[]) => {
		if (this.props.match) {
			if ('labelId' in this.props.match.params) {
				const labelId = this.props.match.params.labelId;
				const labelData = labelList.find(label => label.id === labelId);
				if (labelData) {
					return labelData;
				}
			}
		}
		return DEFAULT_LABEL;
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

	tagLabelHandler = (labelId: string, checkedMemoIds: string[]) => {
		if (checkedMemoIds.length === 0) {
			console.warn('There is not selected Memos');
			return;
		}

		this.labelService.addMemosOnTheLabel(labelId, checkedMemoIds)
		.then( (labelData: LabelData) => {
			let labelList = this.state.labelList;
			for (let i=0; i < labelList.length; i++) {
				if (labelList[i].id === labelData.id) {
					labelList[i] = labelData;
				}
			}

			this.setState({...this.state, selectedLabel: labelData, labelList})
		});
	}

	unTagLabelHandler = (labelId: string, checkedMemoIds: string[]) => {
		if (checkedMemoIds.length === 0) {
			console.warn('There is not selected Memos');
			return;
		}

		this.labelService.removeMemosFromTheLabel(labelId, checkedMemoIds)
		.then((labelData: LabelData) => {
			let labelList = this.state.labelList;
			for (let i=0; i < labelList.length; i++) {
				if (labelList[i].id === labelData.id) {
					labelList[i] = labelData;
				}
			}

			this.setState({...this.state, selectedLabel: labelData, labelList})
		});
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
							addLabelHandler={this.addLabelHandler}
							deleteLabelHandler={this.deleteLabelHandler}/> 
					</Col>
					<Col md={10}>
						<MemoListContainer selectedLabel={this.state.selectedLabel}
							labelList={this.state.labelList}
							updateLabelHandler={this.updateLabelHandler}
							tagLabelHandler={this.tagLabelHandler}
							unTagLabelHandler={this.unTagLabelHandler}
							match={this.props.match}
							history={this.props.history}
							location={this.props.location}
						/>
					</Col>
				</Row>
			</Container>  
		);
	}
}
	