import React from 'react';
import { MemoData, MemoDataRequest } from '../share/Models';
import { Button, Input, Form } from 'reactstrap';
import MemoService from './MemoService';
import { statement } from '@babel/template';


interface Props {
    selectedMemoData: MemoData | null ;
}

interface State {
    form: MemoDataRequest;
}

export default class MemoDetailEdit extends React.Component <Props, State> {
    private readonly service = new MemoService();

    constructor(props: Props) {
        super(props);

        let form: MemoDataRequest;
        if (this.props.selectedMemoData) {
            form = {title: this.props.selectedMemoData.title, 
                    content: this.props.selectedMemoData.content};
        } else {
            form = {title:'', content:''};
        }

        this.state = {form};
    }

    summit = () => {
        if (this.props.selectedMemoData) {
            this.service.updateMemo(this.props.selectedMemoData.id, this.state.form)
            .then( (memo: MemoData) => {
                console.log('ok create!');
            });
        } else {
            this.service.createMemo(this.state.form).then( (memo: MemoData) => {
                console.log('ok update!');
            });
        }
    }

    inputChangeHandler = (e: any) => {
        let inputElement = e.target;
        let value: {[k: string]: string} = {};
        value[inputElement.name] = inputElement.value;
        let form = {...this.state.form, ...value}
        this.setState({form});
    }

    render() {
        return (
            <Form style={{height: '100%'}}>
                <Input type="text" id="memoTitle" name="title"
                       onChange={this.inputChangeHandler}
                       value={this.state.form.title} placeholder="Title"></Input>
                <br/>
                <Input type="textarea" id="memoContent"
                       name="content" 
                       value={this.state.form.content}
                       onChange={this.inputChangeHandler}
                       placeholder="Type memo here."></Input>
                <br/>
                <Button color="success" type="submit" onClick={this.summit}>Summit</Button>
            </Form>
        );
    }
}
 