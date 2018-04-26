import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';


class Counter extends Component {

    state = {salarySinceBeginningOfTheMonth: ''};

    componentDidMount() {
        const {match} = this.props;
        fetch(`http://localhost:8080/${match.params.counterId}`).then(r => r.json()).then(json => {
                const {salary} = json;
                const salaryPerSecond = salary / (30 * 24 * 3600);

                setInterval(() => {
                    const secondsSinceBeginningOfTheMonth = this.secondsSinceBeginningOfTheMonth();
                    this.setState({salarySinceBeginningOfTheMonth: this.format(secondsSinceBeginningOfTheMonth * salaryPerSecond)});
                }, 1000);
            }
        );
    };

    render() {
        return (
            <div>
                <Row style={{marginTop: '150px'}}>
                    <Col className="display-3 text-center">You have earned this month</Col>
                </Row>
                <Row style={{marginTop: '130px'}}>
                    <Col className="display-1 text-center">{this.state.salarySinceBeginningOfTheMonth}</Col>
                </Row>
            </div>
        );
    };

    format = (number) => number.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    });

    secondsSinceBeginningOfTheMonth = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return (now - firstDay) / 1000;
    };
}

export default Counter;
