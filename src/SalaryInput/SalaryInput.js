import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap'
import { translate } from 'react-i18next'
import { SERVER_URL } from '../const'

class SalaryInput extends PureComponent {

    state = { income: '' }

    render() {
        const { t } = this.props
        const { income } = this.state

        return <div style={{ maxWidth: '230px', marginLeft: 'auto', marginRight: 'auto' }}>
            <Row style={{ marginTop: '150px', marginBottom: '10px' }}>
                <Col>
                    <h3 className={'salary-input-text'}>
                        {t('home.title')}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <Label for="salaryInput">{t('home.label')}</Label>
                        <InputGroup>
                            <Input id="salaryInput" autoFocus placeholder={t('home.placeholder')} value={income}
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
                        {t('home.btn')}
                    </Button>
                </Col>
            </Row>
        </div>
    };

    getSalaryRegex = () => {
        return /^[0-9\b]+$/
    }

    handleChange = ({ target }) => {
        const { value } = target
        if (value.trim() === '' || this.getSalaryRegex().test(value)) {
            this.setState({ income: value })
        }
    }

    handleStart = () => {
        const { income } = this.state

        if (this.getSalaryRegex().test(income)) {
            fetch(`${SERVER_URL}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ salary: income })
            }).then(r => r.json()).then(json => {
                const { token } = json
                this.props.history.push(`/c/${token}`)
            })
        } else {
            this.incomeInput.focus()
        }
    }
}

export default withRouter(translate('translations')(SalaryInput))
