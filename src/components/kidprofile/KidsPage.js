import React from 'react'


import ViewKids from './ViewKids'
import Auth from '../../auth'

class KidsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listKids: []};
    }

    componentDidMount() {
        let auth = new Auth();
        let listKids = [];
        let request = new Request('http://www.tea-helper.es/api/kids',
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
export default KidsPage;
