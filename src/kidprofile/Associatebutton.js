import React from 'react'
import {Button} from 'reactstrap';
class Associatebutton extends React.Component {
	constructor(props) {
	        super(props);
	        this.state = {isAssociated: false, }
	    }
	buttonType(){
		if (this.state.isAssociated)
			"Desasociar"
		else
			"Asociar"
	}
	onClickButton(){
		this.setState({isAssociated: !this.state.isAssociated});
	}
	render() {
        return (
            <Button onClick={this.onClickButton.bind(this)} color="primary">{buttonType.bind(this)}</Button>
        );
    }
}

export default Associatebutton;