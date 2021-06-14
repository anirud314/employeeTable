//This is the driver code with the inquirer and the init function
const inquirer = require("inquirer");
//const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");


const menuChoices = [
    {
        name: "View all employees",
        value:"viewEmployees"
    },
    {
        name: "View employees by department",
        value:"viewEmployeesDept"
    },
    {
        name: "View employees by manager",
        value:"viewEmployeesMngr"
    },
    {
        name: "Add employee",
        value:"addEmployee"
    },
    {
        name: "Remove Employee",
        value:"rmvEmployee"
    },
    {
        name: "Update employee role",
        value:"updateRole"
    },
    {
        name: "Update employee manager",
        value:"updateMngr"
    },
    {
        name: "View all roles",
        value:"viewRoles"
    },
    {
        name: "Add Role",
        value:"addRole"
    },
    {
        name: "Remove Role",
        value:"rmvRole"
    },
    {
        name: "View all departments",
        value:"viewDepartments"
    },
    {
        name: "Add a department",
        value:"addDepartments"
    },
    {
        name: "Remove a department",
        value:"rmvDepartments"
    },
    {
        name: "View Total utilized budget by department",
        value:"viewBudget"
    },
    {
        name: "Quit",
        value:"quit"
    }   
];

const menu = [
    {
        type: "list",
        name: "MainMenu",
        message: "What would you like to do?",
        choices: menuChoices
    }
]

function mainMenu(input){
    switch (input) {
        case "viewEmployees":
            viewEmp();
            break;
        case "viewEmployeesDept":
            viewEmpDept();
            break;
        case "viewEmployeesMngr":
            viewEmpMngr();
            break;
        case "addEmployee":
            addEmp();
            break;
        case "rmvEmployee":
            rmvEmp();
            break;
        case "updateRole":
            updateRole();
            break;
        case "updateMngr":
            updateMngr();
            break;
        case "viewRoles":
            viewRoles();
            break;
        case "addRole":
            addRole();
            break;
        case "rmvRole":
            rmvRole();
                break;
        case "viewDepartments":
            viewDept();
            break;
        case "addDepartments":
            addDept();
            break;
        case "rmvDepartments":
            rmvDept();
            break;
        case "viewBudget":
            viewBudget();
            break;
        default:
            quit();
    }

}

function viewEmp(){
    

}
function viewEmpDept(){

}
function viewEmpMngr(){

}
function addEmp(){

}
function rmvEmp(){

}
function updateRole(){

}
function updateMngr(){

}
function viewRoles(){

}
function addRole(){

}
function rmvRole(){

}
function viewDept(){

}
function addDept(){

}
function rmvDept(){

}
function viewBudget(){

}
function quit(){

}
function init(){
    console.log
    inquirer.prompt(menu)
        .then(res => {
            let choice = res.choice;
            mainMenu(choice);
        })
}

init();