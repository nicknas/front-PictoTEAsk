import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {
	Container,
	Row,
	Col,
	Button,
	ButtonGroup
} from 'reactstrap'

import {FaArrowLeft} from 'react-icons/fa';

import DayCalendar from './DayCalendar'
import MonthCalendar from './MonthCalendar'
import WeekCalendar from './WeekCalendar'
import './calendar.css'

class CalendarPage extends React.Component {

	constructor(props) {
		super(props);

		this.kid = {}
		let state = this.props.location.state || {from: {}}

		console.log(state)

		if (state.from.pathname == '/kidspage'
			|| state.from.pathname == '/'
			|| state.from.pathname == '/addStoryCalendar'
			|| state.from.pathname == '/viewStoryCalendar'
			|| state.from.pathname == '/viewGame'
			|| state.from.pathname == '/seetask'
			|| state.from.pathname == '/editGame'
			|| state.from.pathname == '/addGame'
			|| state.from.pathname == '/addtask'
			|| state.from.pathname == '/stories'
			|| state.from.pathname == '/viewgroup') {
			this.kid = state.data || {}
		}

		console.log(this.kid)

		if (!this.kid.id) {
			this.props.history.push('/')
		}

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

	goToStories = () => {
		this.props.history.push({
            pathname: '/stories',
            'state': {
                'from': {'pathname': this.props.location.pathname },
                'data': this.kid
            }
        });
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
					<center>
						<Row className="mx-auto">
							<Col md={{ size: 4, offset: 3}} >
								<br/>
								<ul className="list-group list-group-horizontal" style={{ width: 25 + 'em' }}>
									<Link to="/" type="button" className="btn btn-primary list-group-item list-group-item-action"><FaArrowLeft/></Link>
									<Button color="primary" className="list-group-item list-group-item-action  grupo bot active">Calendarios</Button>
									<Button className="list-group-item list-group-item-action">Valoraciones</Button>
									<Button onClick={this.goToStories} color="primary" className="list-group-item list-group-item-action">Cuentos</Button>
								</ul>
							</Col>
						</Row>
               		</center>
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
					{ this.kid.id && (this.component[this.state.selected])}
				</div>
			</div>
		)
	}
}

export default withRouter(CalendarPage);
