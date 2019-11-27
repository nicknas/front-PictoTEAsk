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

    let { from } = location.state || { from: { pathname: "/kidspage" } };

    return (
        <Group from={from} history={history} />
    );
}
export default GroupPage;
