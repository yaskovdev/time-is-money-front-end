import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import moment from 'moment'

class Counter extends Component {

    state = {salaryThisMonth: ''};

    componentDidMount() {
        const {match} = this.props;
        fetch(`http://localhost:8080/${match.params.counterId}`).then(r => r.json()).then(json => {
                const {salary} = json;
                const salaryPerMs = salary / (30 * 24 * 3600 * 1000);

                setInterval(() => {
                    this.setState({
                        salaryThisYear: this.format(this.msSinceBeginningOfTheYear() * salaryPerMs),
                        salaryThisMonth: this.format(this.msSinceBeginningOfTheMonth() * salaryPerMs),
                        salaryThisWeek: this.format(this.msSinceBeginningOfTheWeek() * salaryPerMs),
                        salaryThisDay: this.format(this.msSinceBeginningOfTheDay() * salaryPerMs),
                        salaryThisHour: this.format(this.msSinceBeginningOfTheHour() * salaryPerMs)
                    });
                }, 200);
            }
        );
    };

    render() {
        return (
            <div>
                <Row style={{marginTop: '150px'}}>
                    <Col className="display-3 text-center">You have earned this year</Col>
                </Row>
                <Row style={{marginTop: '130px'}}>
                    <Col className="display-1 text-center">{this.state.salaryThisYear}</Col>
                </Row>
                <Row style={{marginTop: '190px'}}>
                    <Col className="h4 text-center">Month: {this.state.salaryThisMonth}</Col>
                    <Col className="h4 text-center">This week: {this.state.salaryThisWeek}</Col>
                    <Col className="h4 text-center">Today: {this.state.salaryThisDay}</Col>
                    <Col className="h4 text-center">This hour: {this.state.salaryThisHour}</Col>
                </Row>
                <Row style={{marginTop: '160px'}}>
                    <Col className="text-center">
                        <small>Share this counter with your friend: <a href={window.location.href}>{window.location.href}</a></small>
                    </Col>
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

    msSinceBeginningOfTheWeek = () => moment() - moment().startOf('week');

    msSinceBeginningOfTheDay = () => moment() - moment().startOf('day');

    msSinceBeginningOfTheHour = () => moment() - moment().startOf('hour');

    msSinceBeginningOfTheMonth = () => moment() - moment().startOf('month');

    msSinceBeginningOfTheYear = () => moment() - moment().startOf('year');
}

export default Counter;
