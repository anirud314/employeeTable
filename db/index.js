//This file has the db class model
const mysqlConnect = require("./connection");

class DB {
    constructor(mysqlConnect){
        this.mysqlConnect = mysqlConnect;
    }

    /*CRUD*/
    //CREATE
    createEmp(employee){
        return this.mysqlConnect
        .promise()
        .query(
            "INSERT INTO employee SET ?", employee
        );
    }
    createRole(role){
        return this.mysqlConnect
        .promise()
        .query(
            "INSERT INTO role SET ?", role
        );
    }
    createDept(department){
        return this.mysqlConnect
        .promise()
        .query(
            "INSERT INTO department SET ?", department
        );
    }
    //READ
    findAllEmp(){
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            empId
        );
    }
    findAllRoles(){
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    findAllDept(){
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    findAllMngr(employeeId) {
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    //UPDATE
    updateEmpRole(employeeId, roleId) {
        return this.connection
        .promise()
        .query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(mysqlConnect);