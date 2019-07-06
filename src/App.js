import React, { PureComponent } from 'react'
import './App.css'
import { Container } from 'reactstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Counter from './Counter/Counter'
import SalaryInput from './SalaryInput/SalaryInput'

class App extends PureComponent {

    render() {
        return (
            <Router>
                <Container>
                    <Route exact={true} path="/" component={SalaryInput}/>
                    <Route path="/c/:counterId" component={Counter}/>
                </Container>
            </Router>
        )
    }
}

export default App
