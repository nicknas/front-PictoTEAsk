import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import {Link} from 'react-router-dom'
import {
	Container,
	Row,
	Col
} from 'reactstrap'


import './calendar.css'
import 'animate.css/animate.css'

const api = 'https://pictoteask.000webhostapp.com'

class MonthCalendar extends React.Component {


	constructor(props) {
		super(props);

		this.className = this.className.bind(this)
		this.onClick = this.onClick.bind(this)
		this.prev = this.prev.bind(this)
		this.next = this.next.bind(this)
		this.req = 0

		moment.locale('es');
		this.moment = moment(moment().format('YYYY-MM-01'))
		this.offset = [6, 0, 1, 2, 3, 4, 5]
		this.map_calendar = {}

		let calendar = this.generateCalendar()
		let date = this.moment.format('MMMM YYYY')

		this.state = {date, calendar}
		this.state.loading = true

	}

	generateCalendar() {
		const limit = moment(this.moment).add(1, 'months').format('LLL')
		let calendar = []

		let i = 0;
		let week = parseInt(this.moment.format('d'))
		let day = 0

		for (i=0; i<this.offset[week]; i++) {
			calendar[i] = {
				key: i,
				day: undefined,
				style: {
					background: 'gainsboro'
				},
				task: undefined
			}
		}

		let y = 0
		for (y=i; y<=i+31; y++){

			day++
			this.req = day

			this.map_calendar[day] = y
			calendar[y] = {
										key: y,
										day: day,
										moment: moment(this.moment).add(day-1, 'day'),
										style: {
											background: 'inherit',
											cursor: 'pointer'
										},
										task: undefined
			}

			if (moment(this.moment).add(day, 'day').format('LLL') == limit) {
				break
			}

		}

		for (i=y+1; i<42; i++){
			calendar[i] = {
				key: i,
				day: undefined,
				style: {
					background: 'gainsboro'
				},
				task: undefined
			}
		}

		return calendar

	}

	request(cb) {

		const req = this.req
		let count = 0

		let {calendar} = this.state
		let date = moment(this.moment)
		let up = 0

		for (let i=0; i<req; i++) {

			let formData = new FormData()
			formData.append('id_nino', this.props.parent.kid.id)
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
						let key = this.map_calendar[parseInt(date.format('DD'))]

						if (Tareas[x].path_picto) {

							calendar[key].task = Tareas[x]

							const backgroundImage = `url(${api}${Tareas[x].path_picto})`
							const backgroundSize = 'cover'
							const backgroundPosition = 'center'
							const backgroundRepeat = 'no-repeat'
							const cursor = 'pointer'
							const width = '100%'
							const height = '100%'

							calendar[key].style = {
								width, height, cursor,
								backgroundImage, backgroundSize,
								backgroundPosition, backgroundRepeat
							}
						}

					}

				if (req == count) {
					cb(calendar)
				}

			})
		}

	}

	componentDidMount() {
		this.request((calendar) => {
			let loading = false
			this.setState({loading, calendar})
		})
	}

	className(key) {
		let {calendar} = this.state

		if (calendar[key].task && calendar[key].task.path_picto) {
			return 'animated pulse'
		}
	}

	prev(event) {
		event.preventDefault()
		this.moment = this.moment.subtract(1, 'months')

		let calendar = this.generateCalendar()
		let date = this.moment.format('MMMM YYYY')
		let loading = true

		this.setState({loading, date, calendar})

		this.state.calendar = calendar

		clearTimeout(this.timer)

		this.timer = setTimeout(() => {
			this.request((calendar) => {
				loading = false
				this.setState({loading, calendar})
			})
		}, 1000)
	}

	next(event) {
		event.preventDefault()

		this.moment = this.moment.add(1, 'months')

		let calendar = this.generateCalendar()
		let date = this.moment.format('MMMM YYYY')
		let loading = true

		this.setState({loading, date, calendar})

		this.state.calendar = calendar

		clearTimeout(this.timer)

		this.timer = setTimeout(() => {
			this.request((calendar) => {
				loading = false
				this.setState({loading, calendar})
			})
		}, 1000)
	}

	onClick(moment) {
		if (!moment) return
		let {parent} = this.props

		parent.props.location.state = parent.props.location.state || {from: {}}
		parent.props.location.state.data = moment
		parent.props.location.state.from.pathname = parent.props.location.pathname

		parent.setState({selected: 0})
	}

	render() {
		return (
			<div>
				<div className="calendar">
					<div className="header">
						<a onClick={this.prev} className="cursor-pointer">&#10094;</a>
						<div style={{display: 'flex'}}>
							{
								this.state.loading ? (
									<img style={{marginTop: '-6px', marginBottom: '-8px'}} width="50px" src="images/calendar.gif"/>
								) : (
									<span style={{width: '50px'}}></span>
								)
							}
							{this.state.date}
						</div>
						<a onClick={this.next} className="cursor-pointer">&#10095;</a>
					</div>
				</div>
				<div className="calendar">
					<div className="week">
						<p>Lunes</p>
						<p>Martes</p>
						<p>Miércoles</p>
						<p>Jueves</p>
						<p>Viernes</p>
						<p>Sábado</p>
						<p>Domingo</p>
					</div>
				</div>
				<div className="calendar">
					<div className="wrap">
						{
							this.state.calendar.map((item) => (
								<div onClick={() => this.onClick(item.moment)} style={item.style.background && (item.style)} className="cell" key={item.key}>
									<div style={item.style} className={this.className(item.key)}>{item.day}</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		)
	}
}

export default MonthCalendar;
