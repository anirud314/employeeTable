//This is the driver code with the inquirer and the init function
const inquirer = require("inquirer");
const db = require("./db"); //There is an error here and I dont really know how to fix it.
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

const addRoleMenu = [
    {
        name: "position",
        message: "what is the name of the role?"
    },
    {
        name: "salary",
        message: "what is the roles salary?"
    },
    {
        type: "list",
        name: "deptId",
        message: "What department does the role belong in?",
        choices: deptMenu
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
    db.findAllEmp()
        .then(([rows]) =>{
            let emp = rows;
            console.log("\n");
            console.table(emp);
        })
        .then(() => init());
}

function viewEmpDept(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewEmpMngr(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function addEmp(){
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the first name?"
        },
        {
            name: "last_name",
            message: "What is the last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.findAllRoles()
            .then(([rows]) => {
                let emp = rows
                const roleMenu = emp.map(({id, first_name, last_name}) => (
                    {
                        name: title,
                        value: id
                    }
                ));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "What is the role given?",
                        choices: roleMenu
                    }
                ])
                .then(res => {
                    let roleId = res.roleId;

                    db.findAllEmp()
                        .then(([rows]) => {
                            let emp = rows;
                            const mngrMenu = emp.map (({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            mngrMenu.unshift({name: "None", value: null});

                            inquirer.prompt([{
                                type:"list",
                                name: "managerId",
                                message: "Who is the manager?",
                                choices: mngrMenu
                            }])
                            .then (res => {
                                let emp = {
                                    manager_id: res.managerId,
                                    role_id: roleId,
                                    first_name: firstName,
                                    last_name: lastName
                                }

                                db.createEmp(emp)
                            })
                            .then(() => console.log("Added new player in db"))
                            .then(() => init())
                        })
                })
            })
    })
}
function rmvEmp(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function updateRole(){
    db.findAllEmp()
        .then(([rows]) => {
            let emp = rows;
            const empMenu = emp.map(({id, first_name, last_name}) =>(
                {
                    name: `${first_name} ${last_name}`,
                    value: id
                }
            ));
            inquirer.prompt([
                {
                    type: "list",
                    name: "empId",
                    message: "Which employee do you want to select to update their roles.",
                    choices: empMenu
                }   
            ])
            .then(res => {
                let empId = res.empId;
                db.findAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleMenu = roles.map(({id, position}) => ({
                            name: position,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "roleId",
                                message: "Which role do you want to assign?",
                                choices: roleMenu
                            }
                        ])
                        .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                        .then(() => console.log("Updated employee's role"))
                        .then(() => init())
                    })
            })
        })
}
function updateMngr(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewRoles(){
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => init());
}
function addRole(){
    db.findAllDept()
    .then(([rows]) =>{
        let dept = rows;
        const deptMenu = dept.map(({id, name}) =>({
            name: name,
            value: id
        }));
        inquirer.prompt(addRoleMenu)
        .then(role => {
            db.createRole(role)
                .then(() => console.log(role.title+" Added Role to database"))
                .then(() => init())
        })
    })
}
function rmvRole(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewDept(){
    db.findAllDept()
        .then(([rows]) => {
            let dept = rows;
            console.log("\n");
            console.table(dept);
        })
        .then(() => init());
}
function addDept(){
    inquirer.prompt([
        {
            name: "deptName",
            message: "what is the department called"
        }
    ])
    .then(res => {
        var deptName = res;
        db.createDept(deptName)
            .then(() => console.log(deptName.name+" Added Role to database"))
            .then(() => init())

    })
}
function rmvDept(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function viewBudget(){
    console.log ("DOES NOT WORK YET (TRIED TO DO, DIDNT WORK)");
    init();
}
function quit(){
    console.log("Thank you, Goodbye")
    process.exit();
}
function init(){
    inquirer.prompt(menu)
        .then(res => {
            let choice = res.choice;
            mainMenu(choice);
        })
}
init();
