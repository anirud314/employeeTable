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
    findEmpByDept(departmentId) {
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }
    findEmpByMngr(managerId){
        return this.mysqlConnect
        .promise()
        .query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
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
    findDeptBdgts() {
        return this.connection
        .promise()
        .query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
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
    updateEmpMngr(employeeId, managerId) {
        return this.connection
        .promise()
        .query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }
    //DELETE
    rmvEmp(employeeId) {
        return this.connection
        .promise()
        .query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }
    rmvRole(roleId) {
        return this.connection
        .promise()
        .query(
            "DELETE FROM role WHERE id = ?", 
            roleId
        );
    }
    rmvDept(departmentId) {
        return this.connection
        .promise()
        .query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }
}

module.exports = new DB(mysqlConnect);