import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import {Link} from 'react-router-dom'
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	CardText,
	CardFooter,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'


import './calendar.css'

const api = 'https://pictoteask.000webhostapp.com'

class DayCalendar extends React.Component {


	constructor(props) {
		super(props);

		moment.locale('es');

		let {location} = this.props.parent.props
		let state = location.state || {from: {}}

		this.moment = state.from.pathname == location.pathname && state.data ? state.data : moment()

		this.state = {
			date: this.moment.format("dddd, LL"),
			isOpen: false,
			tasks: []
		}

		this.toggle = this.toggle.bind(this)
		this.go     = this.go.bind(this)
		this.edit   = this.edit.bind(this)
		this.prev   = this.prev.bind(this)
		this.next   = this.next.bind(this)

	}

	componentDidMount() {
		this.request((tasks) => {
			this.setState({
				date: this.moment.format("dddd, LL"),
				tasks: tasks
			})
		})
	}

	edit(task) {
		console.log(task)
	}

	go(pathname) {
		this.props.parent.props.history.push({
						pathname,
						state: {
							from: this.props.parent.props.location.pathname,
							data: {
								kid: this.props.parent.kid,
								moment: this.moment
							}
						}
		})
	}

	toggle(event) {
		event.preventDefault()
		let isOpen = !this.state.isOpen

		this.setState({isOpen})
	}


	prev(event) {
		event.preventDefault()
		this.moment = this.moment.subtract(1, 'day')
		this.request((tasks) => {
			this.setState({
				date: this.moment.format("dddd, LL"),
				tasks: tasks
			})
		})
	}

	next(event) {
		event.preventDefault()
		this.moment = this.moment.add(1, 'day')
		this.request((tasks) => {
			this.setState({
				date: this.moment.format("dddd, LL"),
				tasks: tasks
			})
		})
	}

	request(cb) {
		let formData = new FormData()
		formData.append('id_nino', this.props.parent.kid.id)
		formData.append('date', this.moment.format('YYYY-MM-DD'))

		fetch(`${api}/getTaskDate.php`, {
			method: 'POST',
			body: formData
		}).then(res => res.json()).then(response => {

			let {Tareas} = response
			let tasks = []
			let start = true

			for (let i=0; i < Tareas.length; i++) {
				if (Tareas[i].path_picto) {
					tasks.push({
						key: i,
						data: Tareas[i],
						start: start ? 'images/estrella.png' : 'images/estrella1.png',
						image: `${api}${Tareas[i].path_picto}`,
						init: Tareas[i].hora_inicio,
						end: Tareas[i].hora_fin
					})
					start = false
				}
			}

			cb(tasks)

		})
	}

	render() {
		return (
			<Card style={{width: '25rem'}}>
				<CardHeader>
					<a className="float-left cursor-pointer" onClick={this.prev}>
						<img width="20px" src="images/galon-izquierdo.png" />
					</a>
						<CardTitle className="center-date">{this.state.date}</CardTitle>
					<a className="float-right cursor-pointer" onClick={this.next}>
						<img width="20px" src="images/galon-derecho.png" />
					</a>
				</CardHeader>
				<CardBody>
					{
						this.state.tasks.map((item) => (
							<div onClick={() => this.edit(item) } className="cursor-pointer calendar-select"
								style={{
									'clear': 'both',
									'height': '80px',
									'marginBottom': '5px',
								}} key={item.key}>
								<CardText className="float-left" style={{'padding': '25px 0 0 0'}} >{item.init} - {item.end}</CardText>
								<div className="float-right">
									<img className="img-thumbnail" src={item.image} width="80px"/>
									<img src={item.start} width="20px" />
								</div>
							</div>
						))
					}
				</CardBody>
				<CardFooter>
					<ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
						<Button id="caret" color="primary">Añadir actividad</Button>
						<DropdownToggle caret color="primary" />
						<DropdownMenu>
							<DropdownItem onClick={() => this.go('/addtask')}>Añadir tarea</DropdownItem>
							<DropdownItem onClick={() => this.go('/addStoryCalendar')} >Añadir cuento</DropdownItem>
							<DropdownItem disabled>Añadir juego</DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
				</CardFooter>
			</Card>
		)
	}
}

export default DayCalendar;
