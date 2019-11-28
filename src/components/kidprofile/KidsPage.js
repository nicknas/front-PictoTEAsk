import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'


import ViewKids from './ViewKids'

function KidsPage() {

    let history = useHistory();
    let location = useLocation();

    let from = "/groupspage";
    let from2 = "/associatekid";

    return (
        <ViewKids from={from} from2={from2} history={history} />
    );
}
export default KidsPage;
