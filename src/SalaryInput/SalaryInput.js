import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Button, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';


class SalaryInput extends Component {

    state = {
        salary: '',
        total: ''
    };

    render() {
        const {salary} = this.state;

        return (
            <div>
                <Row>
                    <Col>
                        <InputGroup>
                            <Input placeholder="Enter your net monthly salary" value={salary}
                                   onChange={this.handleChange}/>
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={this.handleStart}>Start counting money</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    };

    handleChange = ({target}) => {
        const {value} = target;
        this.setState({salary: value})
    };

    handleStart = () => {
        const {salary} = this.state;

        fetch(`http://localhost:8080/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({salary})
        }).then(r => r.json()).then(json => {
            const {token} = json;
            this.props.history.push(`/c/${token}`);
        });
    }
}

export default withRouter(SalaryInput);
