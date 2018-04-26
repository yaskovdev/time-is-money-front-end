import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';


class Counter extends Component {

    state = {total: ''};

    componentDidMount() {
        const {match} = this.props;
        fetch(`http://localhost:8080/${match.params.counterId}`).then(r => r.json()).then(json => {
                const {salary} = json;
                const delta = salary / (30 * 24 * 3600);
                const divider = 5;
                let sum = 0;
                setInterval(() => {
                    sum += delta / divider;
                    this.setState({
                        total: this.format(sum)
                    });
                }, 1000 / divider);
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
                    <Col className="display-1 text-center">{this.state.total}</Col>
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
}

export default Counter;
