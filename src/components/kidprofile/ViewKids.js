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
    }

    goGroups(event) {

        event.preventDefault();
        let { from, history } = this.props;

        history.push(from);
    }

    goCreateKid(event) {

        event.preventDefault();
        let { from2, history } = this.props;

        history.push(from2);
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
                                        <Row key={row.id} className="myrow">
                                            <Col style={{'cursor': 'pointer'}} md={10} >
																							<picture>
																								<img
																									src="images/defaultProfile.jpg"
																									className="group-image" /> {row.name}
																							</picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture style={{'cursor': 'pointer'}} onClick={(event) => this.openDeleteModal(event, row.id)}>
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
                                            <picture style={{'cursor': 'pointer'}}>
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
