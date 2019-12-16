import React from 'react'
import { withRouter } from 'react-router-dom';

import ViewKids from './ViewKids'
import Auth from '../../auth'
import { domainToASCII } from 'url';

const enlace = 'https://pictoteask2.000webhostapp.com'

class KidsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listKids: [],
            listPending: []

        }
        this.deleteKid = this.deleteKid.bind(this);
        this.getPending = this.getPending.bind(this);
        this.statusKid = this.statusKid.bind(this);
    }

    componentDidMount() {
        let auth = new Auth();
        let listKids = [];
        let formDataViewKids = new FormData();
        formDataViewKids.append("Tutor", auth.token.id_tutor);
        let request = new Request(`${enlace}/getNinosTutor.php`,
            {
                method: 'POST',
                body: formDataViewKids,
            }
        );
        fetch(request)
            .then((response) => { if (response.ok) return response.json(); })
            .then(data => {
                for (let i = 0; i < data.kids.length; i++) {
                    if (data.kids[i].state == "ACCEPTED") {
                        listKids.push({
                            id: data.kids[i].id_kid,
                            name: data.kids[i].nick,
                            state: data.kids[i].state
                        });
                    }
                }

                this.setState({ listKids })
            });
    }

    deleteKid(id) {
        let auth = new Auth();
        let formDataDelKid = new FormData();
        formDataDelKid.append('id_nino', id);
        formDataDelKid.append('id_tutor', auth.token.id_tutor);

        let formDataDisassociateKid = new FormData();
        formDataDisassociateKid.append('Nino', id);
        formDataDisassociateKid.append('Tutor', auth.token.id_tutor);

        let { listKids } = this.state;
        let auxkids = listKids;

        listKids = listKids.filter(item => {
            return item.id != id;
        });

        this.setState({ listKids })

        fetch(`${enlace}/delKid.php`, {
            method: 'POST',
            body: formDataDelKid
        }).then(response => response.json())
            .then((response) => {
                if (response.error){
                    fetch(`${enlace}/delTutoria.php`, {
                        method: 'POST',
                        body: formDataDisassociateKid
                    }).then(response => response.json())
                        .then((response) => {
                            if (response.error){
                                this.setState({ listKids: auxkids });
                            }
                        });
                }
                });
    }

    statusKid(s,i){
        let auth = new Auth();
        let formDataPenKid = new FormData();
        formDataPenKid.append('id_tutor', auth.token.id_tutor);
        formDataPenKid.append('id_tutor_accion', this.state.listPending[i].id_tutor);
        formDataPenKid.append('id_kid', this.state.listPending[i].id_kid);
        formDataPenKid.append('accion', s);

        fetch(`${enlace}/updateTutoria.php`, {
            method: 'POST',
            body: formDataPenKid
        }).then((response) => { if (response.ok) return response.json(); })
            .then((data) => {
                if (!data.error) {
                    
                }
                }
            );
    }
    getPending() {
        let auth = new Auth();
        let listPending = [];
        let formDataPenKid = new FormData();
        formDataPenKid.append('id_tutor', auth.token.id_tutor);

        fetch(`${enlace}/getPendingTutorias.php`, {
            method: 'POST',
            body: formDataPenKid
        }).then((response) => { if (response.ok) return response.json(); })
            .then((data) => {
                if (!data.error) {
                    for (let i = 0; i < data.turorias.length; i++) {
                        listPending.push({
                            id_tutor: data.turorias[i].id_tutor,
                            nombre: data.turorias[i].nombre,
                            id_kid: data.turorias[i].id_kid,
                            nick: ""
                        });
                    }
                    this.setState({ listPending });
                }
            });
    }
    render() {

        return (
            <ViewKids
                from="/groupspage"
                from2="/associatekid"
                parent={this}
                location={this.props.location}
                history={this.props.history}
                listKids={this.state.listKids}
                deleteKid={this.deleteKid}
                getPending={this.getPending} 
                statusKid = {this.statusKid}/>
        );
    }

}
export default withRouter(KidsPage);
