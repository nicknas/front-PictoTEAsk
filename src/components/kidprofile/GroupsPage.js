import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'

import ViewGroup from './ViewGroup'

function GroupPage() {

    let history = useHistory();
    let location = useLocation();

    let from = "/kidspage";
    let from2 = "/creategroup";

    return (
        <ViewGroup from={from} from2={from2} history={history} />
    );
}
export default GroupPage;
