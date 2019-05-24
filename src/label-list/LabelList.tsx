import React from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import LableService from './LabelService';
import { LabelData, DEFAULT_LABEL } from '../share/Models';

interface State {
    creatingLabel: string;
    selectedLabel: LabelData;
}

interface Props {
    labelList: LabelData[];
    initSelectedLable: LabelData;
    selectLabelHandler: Function;
    addLabelHandler: Function;
}

export default class LableList extends React.Component<Props, State> {
    private readonly service = new LableService();;

    constructor(props: any) {
        super(props)
        this.state = {creatingLabel:'', selectedLabel: this.props.initSelectedLable};
    }

    changeHandler = (e: any) => {
        this.setState({...this.state, creatingLabel: e.target.value})
    }
    createLabel = () => {
        if ( !this.state.creatingLabel || this.state.creatingLabel === '') return;

        this.service.createLable(this.state.creatingLabel)
        .then((label: LabelData) => {
            this.props.addLabelHandler.call(null, label);
        });

        this.setState({...this.state, creatingLabel:''});
    }
    
    selectLabelHandler = (e: any) => {
        const labelId = e.target.id;
        let selectedLabel = this.props.labelList.find(label => label.id === labelId);
        if (!selectedLabel) {
            selectedLabel = DEFAULT_LABEL;
        }

        this.setState({...this.state, selectedLabel});
        this.props.selectLabelHandler.call(null, selectedLabel);
    }

    isActive = (label: LabelData) => {
        return this.state.selectedLabel && label.id === this.state.selectedLabel.id;
    }

    render() {
        const labelList = this.props.labelList.map((label: LabelData) =>{
            return (
                <ListGroupItem id={label.id} key={label.id} tag="button"
                               value={label}
                               onClick={this.selectLabelHandler}
                               active={this.isActive(label)}>

                    {label.title}
                </ListGroupItem>
            );
        });

        return (
            <div>
                <Row><Col md={12}> 
                    <ListGroup>
                        <ListGroupItem key={DEFAULT_LABEL.id} tag="button"
                                onClick={this.selectLabelHandler}
                                active={this.isActive(DEFAULT_LABEL)}>
                            All Memos
                        </ListGroupItem>
                        {labelList}
                    </ListGroup>    
                </Col></Row>
                <br/>
                <InputGroup>
                    <Input id="creatingLabel" type="text" name="lable" placeholder="Add Label" 
                        value={this.state.creatingLabel} onChange={this.changeHandler} ></Input>
                    <InputGroupAddon addonType="append"><Button color="info" onClick={this.createLabel}>{"+"}</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}
