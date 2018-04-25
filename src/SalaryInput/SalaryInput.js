import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Button, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';


class SalaryInput extends Component {

    state = {
        salary: '',
        total: ''
    };

    render = () => {
        const {salary} = this.state;

        return (
            <div>
                <Row>
                    <Col>
                        <InputGroup>
                            <Input placeholder="Enter your net monthly salary" value={salary}
                                   onChange={this.handleChange}/>
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={this.handleStart}>Start</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    };

    handleChange = (event) => {
        this.setState({salary: event.target.value})
    };

    handleStart = () => {
        fetch(`http://localhost:8080/`, {
            method: 'POST',
            body: {
                salary: this.state.salary
            }
        }).then(r => r.json()).then(json => {
            const {token} = json;
            this.props.history.push(`/c/${token}`);
        });
    }
}

export default withRouter(SalaryInput);