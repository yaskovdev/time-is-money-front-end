import React, { PureComponent } from 'react'
import { Col, Row } from 'reactstrap'
import moment from 'moment'
import { SERVER_URL } from '../const'
import { translate } from 'react-i18next'

const EMPTY_VALUE = '—'

class Counter extends PureComponent {

    state = {
        salaryThisYear: EMPTY_VALUE,
        salaryThisMonth: EMPTY_VALUE,
        salaryThisWeek: EMPTY_VALUE,
        salaryThisDay: EMPTY_VALUE,
        salaryThisHour: EMPTY_VALUE
    }

    componentDidMount() {
        const { match } = this.props
        fetch(`${SERVER_URL}/${match.params.counterId}`).then(r => r.json()).then(json => {
                const { salary } = json
                const salaryPerMs = salary / (30 * 24 * 3600 * 1000)

                setInterval(() => {
                    this.setState({
                        salaryThisYear: this.format(this.msSinceBeginningOfTheYear() * salaryPerMs, 4),
                        salaryThisMonth: this.format(this.msSinceBeginningOfTheMonth() * salaryPerMs),
                        salaryThisWeek: this.format(this.msSinceBeginningOfTheWeek() * salaryPerMs),
                        salaryThisDay: this.format(this.msSinceBeginningOfTheDay() * salaryPerMs),
                        salaryThisHour: this.format(this.msSinceBeginningOfTheHour() * salaryPerMs)
                    })
                }, 200)
            }
        )
    };

    render() {
        const { t } = this.props
        const link = window.location.href
        return (
            <div>
                <Row style={{ marginTop: '150px' }}>
                    <Col className="display-3 text-center counter-text">
                        {t('counter.message')}
                    </Col>
                </Row>
                <Row style={{ marginTop: '130px' }}>
                    <Col className="display-1 text-center counter-text">{this.state.salaryThisYear}</Col>
                </Row>
                <Row style={{ marginTop: '190px' }}>
                    <Col lg="3" className="h4 text-center">
                        {t('counter.message-month', { salary: this.state.salaryThisMonth })}
                    </Col>
                    <Col lg="3" className="h4 text-center">
                        {t('counter.message-week', { salary: this.state.salaryThisWeek })}
                    </Col>
                    <Col lg="3" className="h4 text-center">
                        {t('counter.message-today', { salary: this.state.salaryThisDay })}
                    </Col>
                    <Col lg="3" className="h4 text-center">
                        {t('counter.message-hour', { salary: this.state.salaryThisHour })}
                    </Col>
                </Row>
                <Row style={{ marginTop: '160px' }}>
                    <Col className="text-center">
                        <small>
                            {t('counter.share-link')} <a href={link}>{link}</a>
                        </small>
                    </Col>
                </Row>
            </div>
        )
    };

    format = (number, fractionDigits = 2) => number.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    })

    msSinceBeginningOfThe = (unit) => () => moment() - moment().startOf(unit)

    msSinceBeginningOfTheYear = this.msSinceBeginningOfThe('year')

    msSinceBeginningOfTheMonth = this.msSinceBeginningOfThe('month')

    msSinceBeginningOfTheWeek = this.msSinceBeginningOfThe('isoWeek')

    msSinceBeginningOfTheDay = this.msSinceBeginningOfThe('day')

    msSinceBeginningOfTheHour = this.msSinceBeginningOfThe('hour')
}

export default translate('translations')(Counter)
