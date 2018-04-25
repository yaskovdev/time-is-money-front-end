import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        salary: '',
        total: ''
    };

    render() {
        const {salary, total} = this.state;
        return (
            <div>
                <div>
                    <input placeholder="Enter your net monthly salary" value={salary}
                           onChange={this.handleChange}/>
                    <input type="button" value="Start" onClick={this.handleStart}/>
                </div>
                <div>You have earned {total} &euro; so far</div>
            </div>
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
