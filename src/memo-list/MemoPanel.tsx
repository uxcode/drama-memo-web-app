import React from 'react';
import { Button, Row, Col, DropdownItem, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

import { LabelData, DEFAULT_LABEL } from '../share/Models';
import LableService from '../label-list/LabelService';

interface Props {
    selectedLabel: LabelData;
    labelList: LabelData[];
    updateLabelHandler: Function;
    newMemoModeHandler: Function;
    tagLabelHandler: Function;
    unTagLabelHandler: Function;
}

interface State {
    isEditState: boolean;
    updatingLableTitle: string;
    dropdownOpen: boolean;
}

export default class MemoPanel extends React.Component<Props, State> {
    private readonly labelService = new LableService();
    private inputLable: any;

    constructor(props: Props) {
        super(props);

        this.state = { isEditState: false, 
                       updatingLableTitle: props.selectedLabel.title,
                       dropdownOpen: false };
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

    newMemo = (e: any) => {
        this.props.newMemoModeHandler(this.props.selectedLabel);
    }

    tagLabel = (e: any) => {
        const labelId = e.currentTarget.value;
        this.props.tagLabelHandler.call(null, labelId);
    }

    unTagLabel = (e: any) => {
        this.props.unTagLabelHandler.call(null, this.props.selectedLabel.id);
    }
    
    toggle = () => {
        this.setState(prevState => ({
            ...this.state,
            dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render() {
        return (
            <div>
                { this.renderHeaderWithLabel() }
                <hr/>
                <Row>
                    <Col md={2}>
                        {this.renderTagLabelDropDown()}
                    </Col>
                    <Col md={2}>
                        <Button color="danger" onClick={this.unTagLabel} hidden={this.isAllMemo()}>
                            <span className="fas fa-window-close"></span>
                        </Button>
                    </Col>
                    <Col md={{size:4, offset:4}} className="text-right">
                        <Button color="primary" onClick={this.newMemo}>
                            <span className="fas fa-plus-square"></span>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    renderTagLabelDropDown = () => {
        const labelList = this.props.labelList.map((label: LabelData) =>{
            return (
                <DropdownItem key={label.id} value={label.id} onClick={this.tagLabel}>{label.title}</DropdownItem>
            );
        });

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color='success'>
                    <span className="fas fa-tags"></span>
                </DropdownToggle>
                <DropdownMenu>
                    {labelList}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderHeaderWithLabel() {
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