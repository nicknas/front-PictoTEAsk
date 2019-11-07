import React from 'react'
import {Container,Button} from 'reactstrap'
import Associatebutton from '/Associatebutton'
class Kidprofile extends React.Component{
	//constructor(props){
		//super(props);
		//this.state = profile;
	//}

	render(){
		return(
			<Container>
				<h1>Perfil de Antonio</h1>
				<img src="" alt=""></img>
				<p>Nombre y apellidos</p>
				<p>Cuidador</p>

				//<Associatebutton isAssociated={false}/>

			</Container>
		);
	}
}
export default Kidprofile;

//<h1>Perfil de {this.profile.nickname}</h1>
				//<img src = {this.profile.imagen} alt=""/>
				//<h3> {this.profile.nombre}{this.profile.apellido}</h3>