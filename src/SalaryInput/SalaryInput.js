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
                    <h1 className={'salary-input-text'}>
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
                    <InputGroup className={'salary-group'}>
                        <Input autoFocus placeholder={placeholder} value={income} className={'salary-input'}
                               onChange={this.handleChange} innerRef={input => this.incomeInput = input}
                               onKeyPress={target => target.charCode === 13 && this.handleStart()}/>
                        <InputGroupAddon addonType="append" className={'button-section'}>
                            <Button color="primary" onClick={this.handleStart} className={'salary-button'}>
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

    getSalaryRegex = () => {
        return /^[0-9\b]+$/;
    };

    handleChange = ({target}) => {
        const {value} = target;
        if (value.trim() === '' || this.getSalaryRegex().test(value)) {
            this.setState({income: value})
        }
    };

    handleStart = () => {
        const {income} = this.state;

        if (this.getSalaryRegex().test(income)) {
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
        } else {
            this.incomeInput.focus();
        }
    }
}

SalaryInput.propTypes = {
    intl: intlShape.isRequired
};

export default withRouter(injectIntl(SalaryInput));
