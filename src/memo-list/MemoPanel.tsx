import React from 'react';
import { Button, Row, Col } from 'reactstrap';

import { LabelData, DEFAULT_LABEL } from '../share/Models';
import LableService from '../label-list/LabelService';

interface Props {
    selectedLabel: LabelData;
    updateLabelHandler: Function;
    newMemoHandler: Function;
    deleteLabelHandler: Function;
}

interface State {
    isEditState: boolean;
    updatingLableTitle: string;
}

export default class MemoPanel extends React.Component<Props, State> {
    private readonly labelService = new LableService();
    private inputLable: any;

    constructor(props: Props) {
        super(props);

        this.state = {isEditState: false, updatingLableTitle: props.selectedLabel.title};
    }

    isAllMemo = (): boolean => {
        return this.props.selectedLabel.id === DEFAULT_LABEL.id;
    }

    toggleEditState = () => {
        const isEditState = !this.state.isEditState;
        this.setState({...this.state, isEditState});
    }

    componentDidUpdate = (prevProps: Props) => {
        if (this.props !== prevProps) {
            this.setState({...this.state, updatingLableTitle: this.props.selectedLabel.title});
        }
        if (this.state.isEditState && this.inputLable) {
            this.inputLable.focus();
        }
    }

    labelChangeHandler = (e: any) => {
        this.setState({...this.state, updatingLableTitle: e.target.value});
    }
    
    updateLabelTitle = () => {
        this.labelService.renameLabel(
            this.props.selectedLabel.id,
            this.state.updatingLableTitle
        ).then(labelData => {
            this.props.updateLabelHandler.call(null, labelData);
        });
    }

    newMemo = () => {
        console.log('clicked new btn', this.props.newMemoHandler);
        this.props.newMemoHandler.call(null, this.props.selectedLabel);
    }

    deleteLabel = () => {
        this.props.deleteLabelHandler.call(null, this.props.selectedLabel);
    }
    

    render() {
        return (
            <div>
                { this.renderLabel() }
                <hr/>
                <Row>
                    <Col md={8}>
                        <Button color="success" disabled={this.isAllMemo()}>
                            <span className="fas fa-tag"></span>
                        </Button>
                        &nbsp;&nbsp;
                        <Button color="secondary" disabled={this.isAllMemo()}>
                            <span className="fas fa-window-close"></span>
                        </Button>
                    </Col>
                    <Col md={4} className="text-right">
                        <Button color="danger" onClick={this.deleteLabel}>
                            <span className="fas fa-trash-alt"></span>
                        </Button>
                        &nbsp;&nbsp;
                        <Button color="info" onClick={this.newMemo}>
                            <span className="fas fa-plus-square"></span>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    renderLabel() {
        if (this.state.isEditState) {
            return (
                <Row>
                    <Col md={10}>
                        <input id="updateLabel" type="text" name="lable"
                            ref={ref => this.inputLable=ref}
                            value={this.state.updatingLableTitle} 
                            onChange={this.labelChangeHandler} 
                            onBlur={() => {
                                setTimeout(()=> this.toggleEditState(), 200)
                                }
                            }
                            />
                    </Col>
                    
                    <Button color="info" 
                            disabled={this.isAllMemo()}
                            onClick={this.updateLabelTitle}>
                        <span className="fas fa-arrow-alt-circle-up"></span>
                    </Button>
                </Row> 
            );
        } else {
            return (
                <Row> 
                    <Col md={10}>
                        <h3>
                            {this.props.selectedLabel.title}
                        </h3>
                    </Col>
                    <Col md={2}>
                        <Button outline color="info" disabled={this.isAllMemo()}
                                    onClick={this.toggleEditState}>
                                <span className="fas fa-edit"></span>
                        </Button>
                    </Col>
                </Row> 
            );
        }
    }
}