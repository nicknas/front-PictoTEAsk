import React from 'react'
import {withRouter} from 'react-router-dom';

import ViewKids from './ViewKids'
import Auth from '../../auth'
import { domainToASCII } from 'url';

class KidsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listKids: []};
    }

    componentDidMount() {
        let auth = new Auth();
        let listKids = [];
        let request = new Request('https://pictoteask.000webhostapp.com/getNinosTutor.php',
                    {
                        method: 'GET',
                        headers: {'X-AUTH-TOKEN': auth.token},
                    }
                );
        fetch(request)
            .then((response) => {if (response.ok) return response.json();})
            .then(kids => {
                kids.forEach((row) => {
                    listKids.push({name: row.nick, id: row.id});
                });
                this.setState({listKids: listKids});
            });
    }


    render() {
        let from = "/groupspage";
        let from2 = "/associatekid";
            
        return (
            <ViewKids from={from} from2={from2} history={this.props.history} listKids={this.state.listKids}/>
        );
    }

}
export default withRouter(KidsPage);
