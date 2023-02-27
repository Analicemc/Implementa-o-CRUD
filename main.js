//import * as http from "http.js";
let employees = [];
let roles = [];
let selectedItem;
const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const bDelete = document.getElementById("bdelete");
const bCancel = document.getElementById("bcancel");
const bSubmit = document.getElementById("bsubmit");

async function init(){

    try {
        [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
        renderData();
        clearSelection();
        bCancel.addEventListener("click", clearSelection);
    } catch (error) {
        showError(error);
    }
}
init()

function selectItem(employee, li){
    clearSelection();
    selectedItem = employee;
    li.classList.add("selected");
    formEl.name.value = employee.name //no contexto de formulário existe uma propriedade name que permite acessar os campos por meio do nome
    formEl.salary.valueAsNumber = employee.salary;
    formEl.role_id.valueAsNumber = employee.role_id;
    bDelete.style.display = 'inline';
    bCancel.style.display = 'inline';
}

function clearSelection(){
    selectedItem = undefined;
    let li = listEl.querySelector(".selected");
    if (li /** qualquer variável não nula é lida como true no if*/){
        li.classList.remove("selected");
    }
    formEl.name.value = null;
    formEl.salary.valueAsNumber = null;
    formEl.role_id.valueAsNumber = null;
    bDelete.style.display = 'none'; // faz o botão delete desaparecer quando não há algo selecionado
    bCancel.style.display = 'none';

}

function renderData(){
    for(const employee of employees){
        let role = roles.find((role) => role.id == employee.role_id);
        const li = document.createElement("li");
        li.style.cursor = 'pointer';
        const divName = document.createElement("div");
        const divRole = document.createElement("div");
        divName.textContent = employee.name;
        divRole.textContent = role.name;
        li.appendChild(divName);
        li.appendChild(divRole);
        listEl.appendChild(li);
        li.addEventListener("click", () => selectItem(employee, li));
    }

}

function renderRoles(){
    for (const role of roles){
        const option = document.createElement('option')
        const select = document.getElementsByName("role_id")
    }
}

function showError(error){
    document.getElementById("errors").innerHTML = "Erro ao carregar dados";
    console.error(error);
}

// mudar de arquivo dps
function fetchJson(url){
    return fetch(url).then((r) => {
    if (r.ok) {
        return r.json();
    } else {
        throw new Error(r.statusText);
    }
});
}

function listEmployees(){
    return fetchJson("http://localhost:3000/employees"); 
}

function listRoles(){
    return fetchJson("http://localhost:3000/roles"); 
}