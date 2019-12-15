import React from 'react'
import {withRouter} from 'react-router-dom'
import {
	Container,
	Row,
	Col,
	Label,
	Input,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Alert
} from 'reactstrap';

import Auth from '../../auth';

import './groups.css'

const enlace = 'https://pictoteask.000webhostapp.com'

class ViewGroup extends React.Component {
    constructor(props) {
        super(props);

				let state = this.props.location.state || {from: {}, data: {}}

				if (!state.data.group) {
        	this.props.history.push("/kidspage");
				}

				this.group = state.data.group || {}

				if (state.from.pathname == '/groupspage') {
					this.kids = state.data.kids || []
				}

        this.state = {
						listKidsGroup: [],
            deleteModalOpened: false,
            kidToAdd: "",
            kidToDelete: "",
            addModalOpened: false,
            addModalOpened: false,
            errorAlert: false,
            error_msg: ""
        };
        this.openAddModal = this.openAddModal.bind(this);
        this.gokids = this.gokids.bind(this);
        this.goGroups = this.goGroups.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.saveNewKid = this.saveNewKid.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.handleNickName = this.handleNickName.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.deleteKid = this.deleteKid.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    deleteKid() {
        let auth = new Auth();
        let listKids = [];
        let formData = new FormData()
        formData.append('Tutor', auth.token.id_tutor);
        formData.append('Nino', this.state.kidToDelete);
        formData.append('Grupo', this.group.id);
        fetch(`${enlace}/delRelacionGroup.php`, {
            method: 'POST',
            body: formData
        }).then(() => {
                let auth = new Auth();
                let listKids = [];
                let formData = new FormData()
                formData.append('Tutor', auth.token.id_tutor);

                formData.append('Nombre_grupo', this.group.name);
                fetch(`${enlace}/getNinosGrupo.php`, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json())
                    .then((data) => {
                        for (let i = 0; i < data.kids.length; i++) {
													listKids.push({
														name: data.kids[i].nick,
														id: data.kids[i].id_kid });

                        }
												this.setState({listKidsGroup: listKids});

                    });
            })
        this.setState({ deleteModalOpened: false, kidToDelete: "" });
    }
    closeDeleteModal(event) {
        this.setState({ deleteModalOpened: false, kidToDelete: "" });
    }
    openDeleteModal(event, id) {
        this.setState({ deleteModalOpened: true, kidToDelete: id});
        event.stopPropagation();
    }
    onDismiss() {
        this.setState({ errorAlert: false, error_msg: "" });
    }
    handleNickName(event) {


        this.setState({ kidToAdd: event.target.value });
    }

    closeAddModal() {
        this.setState({ kidToAdd: "", addModalOpened: false, errorAlert: false, error_msg: "" });
    }
    openAddModal(event) {
        this.setState({ addModalOpened: true });
        event.stopPropagation();
    }


    gokids(event) {
        event.preventDefault();

        this.props.history.push('/kidspage');
    }

    goGroups(event) {
        event.preventDefault();

				this.props.history.push({
					pathname: '/groupspage',
					'state': {
						'from': {'pathname': this.props.location.pathname },
						'data': this.kids
					}
				});

    }

    saveNewKid() {
        let idKid = "";
        let existe = false;
        let alreadyin = false;
        for (let i = 0; i < this.kids.length; i++) {
            if (this.kids[i].name == this.state.kidToAdd) {
                idKid = this.kids[i].id;
                existe = true;
            }
        }
        for (let i = 0; i < this.state.listKidsGroup.length; i++) {
            if (this.state.listKidsGroup[i].name == this.state.kidToAdd) {
                idKid = this.state.listKidsGroup[i].id;
                alreadyin = true;
            }
        }
        if (!existe || alreadyin) {
            this.setState({ errorAlert: true });
        }
        else {
            this.closeAddModal();
        }


        let auth = new Auth();
        let formDataGroup = new FormData();
        formDataGroup.append("id_kid", idKid);
        formDataGroup.append("id_tutor", auth.token.id_tutor);
        formDataGroup.append("id_group", this.group.id);

        fetch('https://pictoteask.000webhostapp.com/addKidToGroup.php', {
            method: "POST",
            body: formDataGroup
        }).then(response => response.json())
            .then((data) => {
                if (!data.error) {
                    let listKids = [];
                    let formData = new FormData()
                    formData.append('Tutor', auth.token.id_tutor);

                    formData.append('Nombre_grupo', this.group.name);
                    fetch(`${enlace}/getNinosGrupo.php`, {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json())
                    .then((data) => {
                        for (let i = 0; i < data.kids.length; i++) {
													listKids.push({
														name: data.kids[i].nick,
														id: data.kids[i].id_kid
													});

                        }
											this.setState({
												listKidsGroup: listKids,
												addModalOpened: false,
												kidToAdd: "",
												errorAlert: false
											});

                    });

                }
                else {
                    console.log(data.error_msg);
                    if(data.error_msg == "Ya se encuentra en el grupo"){
											this.setState({
												errorAlert: true,
												error_msg: "El niño con ese nick ya se encuentra dentro del grupo"
											});

                    }
                    else{
											this.setState({
												errorAlert: true,
												error_msg: "El nick del niño que has introducido no existe en tu lista de niños asociados"
											});
                    }
                }
            }
            );


    }

    componentDidMount() {

        if (this.group.name) {
            let auth = new Auth();
            let listKids = [];
            let formData = new FormData()
            formData.append('Tutor', auth.token.id_tutor);

            formData.append('Nombre_grupo', this.group.name);
            fetch(`${enlace}/getNinosGrupo.php`, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then((data) => {
                    for (let i = 0; i < data.kids.length; i++) {
											listKids.push({
												name: data.kids[i].nick,
												id: data.kids[i].id_kid
											});

                    }
                    this.setState({listKidsGroup: listKids});

                });
        }

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
                        <Container>
                            <Row className="mx-auto">
                                <Col md={6} className="btncol">
                                    <Button type="submit" color="primary"
                                        className="btn-block btnwhite tx-tfm" onClick={this.gokids}>Niños</Button>
                                </Col>
                                <Col md={6} className="btncol" >
                                    <Button type="submit" color="primary"
                                        className="btn-block btnblue tx-tfm" onClick={this.goGroups} >Grupos</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Container className='group-list'>
                                    <h5>{this.group.name}</h5>

                                    {this.state.listKidsGroup.map((item) =>

                                        <Row id={item.id} key={item.id} className="myrow">
                                            <Col md={10} >
                                                <picture>
																									<img
																										src="images/defaultProfile.jpg"
																										className="group-image" />{item.name}
                                                </picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture style={{'cursor': 'pointer'}} onClick={(event) => this.openDeleteModal(event, item.id)}>
                                                    <img src="images/papelera.png" width="25px" />
                                                </picture>
                                            </Col>
                                            <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                                                <ModalHeader toggle={this.closeDeleteModal}>Sacar niño del grupo</ModalHeader>
                                                <ModalBody>¿Está seguro de que quiere sacar al niño del grupo {this.props.groupSelectedName}?</ModalBody>
                                                <ModalFooter  ><Button id={item.id} key={item.id} color="danger" onClick={(event) => this.deleteKid(event)}>Sacar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Row>

                                    )}
                                    <Row onClick={this.openAddModal}>
                                        <Col>
                                            <picture style={{'cursor': 'pointer'}}>
                                                <img src="images/botonNew.svg" className="group-image" /> <font color="#3E8EDE">Añadir niño</font>
                                            </picture>
                                        </Col>

                                    </Row>

                                    <Modal isOpen={this.state.addModalOpened} toggle={this.closeAddModal}>
                                        <ModalHeader toggle={this.closeAddModal}>Añadir niño al grupo</ModalHeader>
                                        <ModalBody><Label for="">Nick del niño</Label><Input type="text" onChange={this.handleNickName} /></ModalBody>
                                        <Alert color="danger" isOpen={this.state.errorAlert} toggle={this.onDismiss}>
                                            {this.state.error_msg}
                                        </Alert>
                                        <ModalFooter><Button color="success" onClick={this.saveNewKid}>Guardar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>

                                    </Modal>
                                </Container>

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(ViewGroup);
