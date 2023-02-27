
function fetchJson(url){
    return fetch(url).json();
}

async function listEmployees(){
    return await fetchJson("http://localhost:3000/employees"); 
}

async function listRoles(){
    return await fetchJson("http://localhost:3000/roles"); 
}
export {listEmployees, listRoles};