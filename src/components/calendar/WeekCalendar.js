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
	CardFooter
} from 'reactstrap'


import './calendar.css'

const api = 'https://pictoteask.000webhostapp.com'

class WeekCalendar extends React.Component {


	constructor(props) {
		super(props);

		moment.locale('es');
		this.moment = moment().day(1)
		this.state = {
			date_s: this.moment.format("D"),
			date_e: moment(this.moment).add(6, 'day').format("LL"),
			tasks: []
		}

		this.prev = this.prev.bind(this)
		this.next = this.next.bind(this)

	}

	componentDidMount() {
		this.request((tasks) => {
			this.setState({
				date_s: this.moment.format("D"),
				date_e: moment(this.moment).add(6, 'day').format("LL"),
				tasks: tasks
			})
		})
	}

	prev(event) {
		event.preventDefault()
		this.moment = this.moment.subtract(1, 'day')
		this.request((tasks) => {
			this.setState({
				date_s: this.moment.format("D"),
				date_e: moment(this.moment).add(6, 'day').format("LL"),
				tasks: tasks
			})
		})
	}

	next(event) {
		event.preventDefault()
		this.moment = this.moment.add(1, 'day')
		this.request((tasks) => {
			this.setState({
				date_s: this.moment.format("D"),
				date_e: moment(this.moment).add(6, 'day').format("LL"),
				tasks: tasks
			})
		})
	}

	request(cb) {

		const req = 7
		let tasks = []
		let date = moment(this.moment)
		let count = 0
		let up = 0

		for (let i=0; i<req; i++) {

			let formData = new FormData()
			formData.append('id_nino', 28)
			formData.append('date', date.add(up, 'day').format('YYYY-MM-DD'))
			up = 1

			fetch(`${api}/getTaskDate.php`, {
				method: 'POST',
				body: formData
			}).then(res => res.json()).then(response => {

					count++
					let {Tareas} = response

					for (let x=0; x < Tareas.length; x++) {

						let date = moment(Tareas[x].dia)
						if (Tareas[x].path_picto) {
							tasks.push({
								key: x,
								image: `${api}${Tareas[x].path_picto}`,
								date: `${date.format('dddd DD')} de ${date.format('MMMM')}`
							})
						}
					}

				if (req == count) {
					cb(tasks)
				}

			})
		}

	}

	render() {

		return (
			<Card style={{width: '25rem'}}>
				<CardHeader>
					<a className="float-left cursor-pointer" onClick={this.prev}>
						<img width="20px" src="images/galon-izquierdo.png" />
					</a>
						<CardTitle className="center-date">Del {this.state.date_s} al {this.state.date_e}</CardTitle>
					<a className="float-right cursor-pointer" onClick={this.next}>
						<img width="20px" src="images/galon-derecho.png" />
					</a>
				</CardHeader>
				<CardBody>
					{
						this.state.tasks.map((item) => (
							<div style={{'clear': 'both', 'height': '95px'}} key={item.key}>
								<CardText className="float-left" style={{'padding': '25px 0 0 0'}} >{item.date}</CardText>
								<div className="float-right">
									<img className="img-thumbnail" src={item.image} width="80px"/>
								</div>
							</div>
						))
					}
				</CardBody>
			</Card>
		)
	}
}

export default WeekCalendar;
