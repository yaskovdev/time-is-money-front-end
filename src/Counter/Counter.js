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
                    this.setState({total: sum.toLocaleString(undefined, {minimumFractionDigits: 4})});
                }, 1000 / divider);
            }
        );
    };

    render() {
        return (
            <Row>
                <Col>You have earned {this.state.total} &euro; so far</Col>
            </Row>
        );
    };
}

export default Counter;
