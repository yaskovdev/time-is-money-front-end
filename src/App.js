import React, {Component} from 'react';
import './App.css';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';

class App extends Component {
    state = {
        salary: '',
        total: ''
    };

    render() {
        const {salary, total} = this.state;
        return (
            <Container>
                <Row style={{marginTop: '150px', marginBottom: '10px'}}>
                    <Col>
                        <h1>Time is money</h1>
                    </Col>
                </Row>
                {
                    !total &&
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
                }
                {
                    total &&
                    <Row>
                        <Col>You have earned {total} &euro; so far</Col>
                    </Row>
                }
            </Container>
        );
    }

    handleChange = (event) => {
        this.setState({salary: event.target.value})
    };

    handleStart = () => {
        const {salary} = this.state;
        const delta = salary / (30 * 24 * 3600);
        const divider = 5;
        let sum = 0;
        setInterval(() => {
            sum += delta / divider;
            this.setState({total: sum.toLocaleString(undefined, {minimumFractionDigits: 4})});
        }, 1000 / divider);
    }
}

export default App;
