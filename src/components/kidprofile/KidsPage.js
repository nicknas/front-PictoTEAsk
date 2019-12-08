import React, {useState, useEffect} from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'


import ViewKids from './ViewKids'
import Auth from '../../auth'

function KidsPage() {

    let history = useHistory();
    let location = useLocation();

    let from = "/groupspage";
    let from2 = "/associatekid";
    const [listKids, setListKids] = useState([]);

		let auth = new Auth()

    let request = new Request('http://www.tea-helper.es/api/kids',
                    {
                        method: 'GET',
                        headers: {'X-AUTH-TOKEN': auth.token},
                    }
                );
    useEffect(() => {
        fetch(request)
        .then((response) => {if (response.ok) return response.json();})
        .then(kids => {
            let listKids = [];
            kids.forEach((row) => {
                listKids.push({name: row.nick, id: row.id});
            });
            setListKids(listKids);
        });
    });
    return (
        <ViewKids from={from} from2={from2} history={history} listKids={listKids}/>
    );
}
export default KidsPage;
