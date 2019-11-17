import React from 'react'
import { Jumbotron, Container } from 'reactstrap';


class RatingsView extends React.Component {
    render() {
        return (

            <div className="container contenedor">
                <div className="row fila">
                    <div className="col-">
                        <rtl><h2> Valoraciones de Harry </h2><h2><br />
                        </h2></rtl></div>
                    <div className="col-sm">
                        <br />
                        <div id="contenido"><h6><font color="gray"> Harry19 </font></h6><h6 /></div>
                    </div>
                </div>
                <center><div className="row lista">
                    <ul className="list-group flex-sm-row" style={{ width: '38rem' }}>
                        <button type="button" className="list-group-item list-group-item-action ">Calendario</button>
                        <button type="button" className="list-group-item list-group-item-action active">Valoraciones</button>
                    </ul>
                </div></center>
                <div className="row">
                    <div className="col- columna">
                        <div className="card" style={{ width: '175px' }}>
                            <img src="images\jugar_al_baloncesto.png" className="img-thumbnail imgNew" alt="200px" width={200} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Baloncesto</h5>
                                <h6><font color="gray"> 2/11/2019 </font></h6><h6>
                                </h6></div>
                        </div>
                    </div>
                    <div className="col- columna">
                        <div className="card" style={{ width: '175px' }}>
                            <img src="images\sumar.png" className="img-thumbnail imgNew" alt="200px" width={200} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Sumar</h5>
                                <h6><font color="gray"> 2/11/2019 </font></h6><h6>
                                </h6></div>
                        </div>
                    </div>
                    <div className="col- columna">
                        <div className="card" style={{ width: '175px' }}>
                            <img src="images\hacer_la_cama.png" className="img-thumbnail imgNew" alt="200px" width={200} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Hacer la cama</h5>
                                <h6><font color="gray"> 2/11/2019 </font></h6><h6>
                                </h6></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col- columna">
                        <div className="card" style={{ width: '175px' }}>
                            <img src="images\jugar_al_baloncesto.png" className="img-thumbnail imgNew" alt="200px" width={200} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Baloncesto</h5>
                                <h6><font color="gray"> 2/11/2019 </font></h6><h6>
                                </h6></div>
                        </div>
                    </div>
                    <div className="col- columna">
                        <div className="card" style={{ width: '175px' }}>
                            <img src="images\sumar.png" className="img-thumbnail imgNew" alt="200px" width={200} height={200} />
                            <div className="card-body">
                                <h5 className="card-title">Sumar</h5>
                                <h6><font color="gray"> 2/11/2019 </font></h6><h6>
                                </h6></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default RatingsView;