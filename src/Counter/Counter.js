import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import moment from 'moment'

class Counter extends Component {

    state = {};

    componentDidMount() {
        const {match} = this.props;
        fetch(`http://timeismoney.ga/${match.params.counterId}`).then(r => r.json()).then(json => {
                const {salary} = json;
                const salaryPerMs = salary / (30 * 24 * 3600 * 1000);

                setInterval(() => {
                    this.setState({
                        salaryThisYear: this.format(this.msSinceBeginningOfTheYear() * salaryPerMs, 4),
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
        const link = window.location.href;
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
                        <small>Save this counter or share with your friend: <a href={link}>{link}</a></small>
                    </Col>
                </Row>
            </div>
        );
    };

    format = (number, fractionDigits = 2) => number.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });

    msSinceBeginningOfThe = (unit) => () => moment() - moment().startOf(unit);

    msSinceBeginningOfTheYear = this.msSinceBeginningOfThe('year');

    msSinceBeginningOfTheMonth = this.msSinceBeginningOfThe('month');

    msSinceBeginningOfTheWeek = this.msSinceBeginningOfThe('isoWeek');

    msSinceBeginningOfTheDay = this.msSinceBeginningOfThe('day');

    msSinceBeginningOfTheHour = this.msSinceBeginningOfThe('hour');
}

export default Counter;
