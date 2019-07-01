import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row} from 'reactstrap';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {SERVER_URL} from "../const";

class SalaryInput extends Component {

    state = {income: ''};

    render() {
        const {income} = this.state;
        const label = this.props.intl.formatMessage({
            id: 'home.label',
            description: 'Your net monthly income',
            defaultMessage: 'Your net monthly income'
        });
        const placeholder = this.props.intl.formatMessage({
            id: 'home.placeholder',
            description: 'Net income',
            defaultMessage: 'Net income'
        });

        return <div style={{maxWidth: '200px', marginLeft: 'auto', marginRight: 'auto'}}>
            <Row style={{marginTop: '150px', marginBottom: '10px'}}>
                <Col>
                    <h3 className={'salary-input-text'}>
                        <FormattedMessage
                            id='home.title'
                            description='Time is money'
                            defaultMessage='Time is money'
                        />
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <Label for="salaryInput">{label}</Label>
                        <InputGroup>
                            <Input id="salaryInput" autoFocus placeholder={placeholder} value={income}
                                   onChange={this.handleChange} innerRef={input => this.incomeInput = input}
                                   onKeyPress={target => target.charCode === 13 && this.handleStart()}
                                   maxlength={11}/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText>&euro;</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <Button color="secondary" onClick={this.handleStart} className="float-right">
                        <FormattedMessage
                            id='home.btn'
                            description='Start counters'
                            defaultMessage='Start counters'/>
                    </Button>
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
