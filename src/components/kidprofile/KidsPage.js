import React, {useState, useEffect} from 'react'
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
    const [listKids, setListKids] = useState([]); 

    let request = new Request('http://www.tea-helper.es/api/kids', 
                    {
                        method: 'GET',
                        headers: {'X-AUTH-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzU1NTg3OTMsImh0dHA6XC9cL3d3dy5hcGktdGVhLmRncC51Y20uY29tXC9pZCI6NSwiaHR0cDpcL1wvd3d3LmFwaS10ZWEuZGdwLnVjbS5jb21cL2VtYWlsIjoibWFpbEBtYXJpYW5vLmNvbSIsImh0dHA6XC9cL3d3dy5hcGktdGVhLmRncC51Y20uY29tXC9uYW1lIjoiQWxpY2UiLCJodHRwOlwvXC93d3cuYXBpLXRlYS5kZ3AudWNtLmNvbVwvcm9sZXMiOltdLCJodHRwOlwvXC93d3cuYXBpLXRlYS5kZ3AudWNtLmNvbVwvc3VybmFtZSI6IlNtaXRoIn0.vmfeU_nJqZJVjPIzq_KeOiMaIDncS7i4rTitXQdTXLs2ENhVl7z80L5y4V_vZtPLkCToP_aFOIFxEZBvQLBXfzvsF5MjSgFdBXQUEG9EWfjZ1lqyMBpkvqC_hH9Js-qRA36DJS6SUCQMIAy-x0LahZtXYrKPp4Bm8xF-sShribdiN8dM6lfPw_RPBAKntekDqMpLl3mEpOq0Q_3dGYXW8RhE-kwZno8CQsq_ld6mlBR22b8wGIPUhdYbIjOzonA04c0uTAjNdK-EEE26MDVZ11SDMLJNhFKeCzjffl8lhhz-gVIF6_4tOVe_Ft5zRHwbfo15peSpEYpJbfP6Rbxi9XhmP_R2gci_sj7WH9FYeyQlxw5C8OUhk5YDnCqqZ1dxnRLhhaxqe1dqFL9iSAyO1oi2p_fW9DJyZbcf7kTn-NyiiAijq-39Ha5-WVuXwCL6U2h7HSdqOvzUux3oC-AHG3e8q2elzXJ7Dg8BJbhwNXIR7zJI-M7_7j9TVqK0pnYO3EcM8ocUHadGx8Lt3J7y_JMd4qVLoIWGH9euv2l576HOz5JJQSqO3PoDnd_YqhKQ2wSiRt__CaBDXKNxC7ji5zJM7rIOwRW1lDNdpnXT0FP6t8cP55jCzMIXRvxodFoOQ6mPFMwC77oyPtNyGXGob3YrYdzrCZrfHtU7itWN7kg'},
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
