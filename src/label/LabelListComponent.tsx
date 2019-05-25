import React from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import LabelService from './LabelService';
import { LabelData, DEFAULT_LABEL } from '../share/Models';

interface State {
    creatingLabel: string;
}

interface Props {
    labelList: LabelData[];
    selectedLabel: LabelData;
    initSelectedLable: LabelData;
    selectLabelHandler: Function;
    addLabelHandler: Function;
    deleteLabelHandler: Function;
}

export default class LableList extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {creatingLabel:''};
    }

    changeHandler = (e: any) => {
        this.setState({...this.state, creatingLabel: e.target.value})
    }
    createLabel = () => {
        if ( !this.state.creatingLabel || this.state.creatingLabel === '') return;

        LabelService.createLable(this.state.creatingLabel)
        .then((label: LabelData) => {
            this.props.addLabelHandler.call(null, label);
        });

        this.setState({...this.state, creatingLabel:''});
    }
    
    deleteLabel = (e: any) => {
        this.props.deleteLabelHandler(this.props.selectedLabel);
    }

    selectLabelHandler = (e: any) => {
        const labelId = e.target.id;
        let selectedLabel = this.props.labelList.find(label => label.id === labelId);
        if (!selectedLabel) {
            selectedLabel = DEFAULT_LABEL;
        }
        this.props.selectLabelHandler.call(null, selectedLabel);
    }

    isActive = (label: LabelData) => {
        return this.props.selectedLabel && label.id === this.props.selectedLabel.id;
    }

    render() {
        const labelList = this.props.labelList.map((label: LabelData) =>{
            return (
                <Link to={"/label/"+label.id} key={label.id}>
                    <ListGroupItem id={label.id} tag="button" className="container-fluid"
                                value={label}
                                active={this.isActive(label)}>
                        {label.title}
                    </ListGroupItem>
                </Link>
            );
        });

        return (
            <div>
                <Row><Col md={12}> 
                    <ListGroup>
                        <Link to={"/label/"+DEFAULT_LABEL.id} key={DEFAULT_LABEL.id}>
                            <ListGroupItem tag="button" active={this.isActive(DEFAULT_LABEL)} className="container-fluid">
                                All Memos
                            </ListGroupItem>
                        </Link>
                        {labelList}
                    </ListGroup>    
                </Col></Row>
                <br/><br/>
                <InputGroup>
                    <Input id="creatingLabel" type="text" name="lable" placeholder="Add Label" 
                        value={this.state.creatingLabel} onChange={this.changeHandler} ></Input>
                    <InputGroupAddon addonType="append">
                        <Button color="info" onClick={this.createLabel}>{"+"}</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br style={{"height": "5px"}}/>
                <Button color="danger" onClick={this.deleteLabel} 
                        disabled={this.props.selectedLabel.id === DEFAULT_LABEL.id}
                        className="container-fluid">Delete Label</Button>
            </div>
        );
    }
}
