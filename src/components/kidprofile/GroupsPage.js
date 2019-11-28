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


import Group from './Group'

function GroupPage() {

    let history = useHistory();
    let location = useLocation();

    let from = "/kidspage";
    let from2 = "/creategroup";

    return (
        <Group from={from} from2={from2} history={history} />
    );
}
export default GroupPage;
