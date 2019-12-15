import React from 'react'
import {withRouter} from 'react-router-dom'
import {
	Container,
	Row,
	Col,
	Button,
	ButtonGroup
} from 'reactstrap'

import DayCalendar from './DayCalendar'
import MonthCalendar from './MonthCalendar'
import WeekCalendar from './WeekCalendar'
import './calendar.css'

class CalendarPage extends React.Component {

	constructor(props) {
		super(props);

		this.component = [
				<DayCalendar parent={this} />,
				<WeekCalendar parent={this} />,
				<MonthCalendar parent={this} />
		]

		this.state = {
			selected: 0,
		}
		this.onClick.bind(this)
	}

	onClick(selected) {
		this.setState({selected})
	}

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col md={5} className="mx-auto">
							<div id="first">
								<picture>
									<img alt="Logo Largo" width="100%" src="images/logolargo.png" />
								</picture>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="calendar-container">
					<ButtonGroup>
						<Button className="calendar-btn"
							onClick={() => this.onClick(0)}
							color="primary"
							active={this.state.selected === 0}>Día</Button>
						<Button className="calendar-btn"
							onClick={() => this.onClick(1)}
							color="primary"
							active={this.state.selected === 1}>Semana</Button>
						<Button className="calendar-btn"
							onClick={() => this.onClick(2)}
							color="primary"
							active={this.state.selected === 2}>Mes</Button>
					</ButtonGroup>
				</div>
				<div className="calendar-container">
					{this.component[this.state.selected]}
				</div>
			</div>
		)
	}
}

export default withRouter(CalendarPage);
