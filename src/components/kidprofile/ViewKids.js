import React from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import './groups.css'

class ViewKids extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingModalOpened: true,
            deleteModalOpened: false,
            addModalOpened: false,
            deleteModalOpened: false,
            kidToDelete: "",
            kidToAdd: ""
        };
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteKid = this.deleteKid.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.goGroups = this.goGroups.bind(this);
        this.goCreateKid = this.goCreateKid.bind(this);
        this.closePendingModal = this.closePendingModal.bind(this);
        this.openPendingModal = this.openPendingModal.bind(this);
        this.statusKid = this.statusKid.bind(this);
    }

    goGroups(event) {

        event.preventDefault();
        let { from, history, location } = this.props;

        history.push({
            pathname: from,
            'state': {
                'from': { 'pathname': location.pathname },
                'data': this.props.listKids
            }
        });

    }

    goCreateKid(event) {

        event.preventDefault();
        let { from2, history } = this.props;

        history.push(from2);
    }

    onClick(kid) {
        let { history, location } = this.props;

        history.push({
            pathname: '/calendar',
            'state': {
                'from': { 'pathname': location.pathname },
                'data': kid
            }
        });

    }

    closeDeleteModal() {
        this.setState({
            kidToDelete: "",
            idToDelete: "",
            deleteModalOpened: false
        });
    }

    deleteKid(event) {
        event.preventDefault();

        this.props.parent.deleteKid(this.state.idToDelete);
        this.setState({
            deleteModalOpened: false,
            kidToDelete: ""
        });
    }

    openDeleteModal(event, id) {
        event.stopPropagation();

        let kidName = event.currentTarget.parentNode.previousSibling.innerText;

        this.setState({
            kidToDelete: kidName,
            idToDelete: id,
            deleteModalOpened: true
        });
    }
    statusKid(event, s, i) {
        this.props.statusKid(s, i);
    }
    closePendingModal() {
        this.setState({ pendingModalOpened: false });
    }
    openPendingModal() {
        this.setState({ pendingModalOpened: true });
    }
    getPending() {
        this.props.getPending();
        let kids = this.props.parent.state.listKids;
        let modals = "";
        if (this.props.parent.state.listPending.length > 0) {
            for (let i = 0; i < kids.length; i++)
                for (let j = 0; j < this.props.parent.state.listPending.length; j++)
                    if (kids[i].id == this.props.parent.state.listPending[j].id_kid)
                        this.props.parent.state.listPending[j].nick = kids[i].name;


            let listview = [];
            for (let i = 0; i < this.props.parent.state.listPending.length; i++) {
                listview.push(
                    <div>
                        <a>¿Está seguro de que quiere asociar el niño {this.props.parent.state.listPending[i].nick} a {this.props.parent.state.listPending[i].nombre} ?</a>
                        <Button color="primary" onClick={(event) => this.statusKid(event, "ACCEPTED", i)}>Asociar</Button>
                        <Button color="danger" onClick={(event) => this.statusKid(event, "REFUSED", i)}>Denegar</Button>
                    </div>
                );
            }
            modals = (<Modal
                isOpen={this.state.pendingModalOpened}
                toggle={this.closePendingModal}>
                <ModalHeader toggle={this.openPendingModal}>Asociar niños</ModalHeader>
                <ModalBody>{listview}</ModalBody>
                <ModalFooter><Button color="secondary" onClick={this.closePendingModal}>Cancelar</Button></ModalFooter>
            </Modal>);
        }

        return modals;
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <Row>
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>
                        </Row>
                        {this.getPending()}
                        <Container>
                            <Row className="mx-auto">
                                <Col md={6} className="btncol">
                                    <Button type="submit" color="primary"
                                        className="btn-block btnbluek tx-tfm">Niños</Button>
                                </Col>
                                <Col md={6} className="btncol" >
                                    <Button type="submit" color="primary"
                                        className="btn-block btnwhitek tx-tfm" onClick={this.goGroups}>Grupos</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Container className='group-list'>
                                    <h5>Niños</h5>

                                    {this.props.listKids.map((row) =>
                                        <Row key={row.id} className="myrow btc-select">
                                            <Col onClick={() => this.onClick(row)} style={{ 'cursor': 'pointer' }} md={10} >
                                                <picture>
                                                    <img
                                                        src="images/defaultProfile.jpg"
                                                        className="group-image" /> {row.name}
                                                </picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture style={{ 'cursor': 'pointer' }} onClick={(event) => this.openDeleteModal(event, row.id)}>
                                                    <img src="images/papelera.png" width="25px" />
                                                </picture>
                                            </Col>
                                            <Modal
                                                isOpen={this.state.deleteModalOpened}
                                                toggle={this.closeDeleteModal}>
                                                <ModalHeader toggle={this.closeDeleteModal}>Desasociar niño</ModalHeader>
                                                <ModalBody>¿Está seguro de que quiere desasociar el niño {this.state.kidToDelete}?</ModalBody>
                                                <ModalFooter><Button id={row.id} key={row.id} color="danger" onClick={(event) => this.deleteKid(event)}>Desasociar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Row>
                                    )}

                                    <Row onClick={this.goCreateKid}>
                                        <Col>
                                            <picture style={{ 'cursor': 'pointer' }}>
                                                <img src="../images/botonNew.svg" className="group-image" /> <font color="#3E8EDE">Añadir niño</font>
                                            </picture>
                                        </Col>
                                    </Row>

                                </Container>

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ViewKids;
