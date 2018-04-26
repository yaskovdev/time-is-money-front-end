import React, {Component} from 'react';
import './App.css';
import {Col, Container, Row} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Counter from "./Counter/Counter";
import SalaryInput from "./SalaryInput/SalaryInput";

class App extends Component {

    render() {
        return (
            <Router>
                <Container>
                    <Row style={{marginTop: '150px', marginBottom: '10px'}}>
                        <Col>
                            <h1>Time is money</h1>
                        </Col>
                    </Row>
                    <Route exact={true} path="/" component={SalaryInput}/>
                    <Route path="/c/:counterId" component={Counter}/>
                </Container>
            </Router>
        );
    }
}

export default App;
