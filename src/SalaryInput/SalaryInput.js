import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {SERVER_URL} from "../const";

class SalaryInput extends Component {

    state = {income: ''};

    render() {
        const {income} = this.state;
        const placeholder = this.props.intl.formatMessage({
            id: 'home.placeholder',
            description: 'Enter your net monthly income',
            defaultMessage: 'Enter your net monthly income'
        });

        return <div>
            <Row style={{marginTop: '150px', marginBottom: '10px'}}>
                <Col>
                    <h1>
                        <FormattedMessage
                            id='home.title'
                            description='Time is money'
                            defaultMessage='Time is money'
                        />
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup>
                        <Input autoFocus placeholder={placeholder} value={income}
                               onChange={this.handleChange} innerRef={input => this.incomeInput = input}
                               onKeyPress={target => target.charCode === 13 && this.handleStart()}/>
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={this.handleStart} className={'button'}>
                                <FormattedMessage
                                    id='home.btn'
                                    description='Start counting money'
                                    defaultMessage='Start counting money'
                                />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
        </div>;
    };

    handleChange = ({target}) => {
        const {value} = target;
        this.setState({income: value})
    };

    handleStart = () => {
        const {income} = this.state;

        if (income.trim() === '') {
            this.incomeInput.focus();
        } else {
            fetch(`${SERVER_URL}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({salary: income})
            }).then(r => r.json()).then(json => {
                const {token} = json;
                this.props.history.push(`/c/${token}`);
            });
        }
    }
}

SalaryInput.propTypes = {
    intl: intlShape.isRequired
};

export default withRouter(injectIntl(SalaryInput));
