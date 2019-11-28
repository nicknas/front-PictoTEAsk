import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'
import {
	Container,
	Row,
	Col
} from 'reactstrap'


import ViewKids from './ViewKids'

function KidsPage() {

    let history = useHistory();
    let location = useLocation();

    let from = "/viewKids";
    let from2 = "/createKid";

    return (
        <ViewKids from={from} from2={from2} history={history} />
    );
}
export default KidsPage;
