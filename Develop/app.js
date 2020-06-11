const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
async employeeResponse(){
    let employeeInput=
    await inquirer
    .prompt([
        {type:"input", message: "Name: ", name: "name"},
        {type:"input", message: "ID Number: ", name: "ID"},
        {type:"input", message: "Email address: ", name: "email"},
        {type:"input", message: "Company Title: ", name: "title"}
    ]);
    switch (employeeInput.title.toLowerCase()){
        case "manager": employeeInput= await this.officeNumberInput(employeeInput);
        case "engineer": employeeInput= await this.getGithubUser(employeeInput);
        case "intern": employeeInput= await this.getSchoolAtt(employeeInput);
    }
    return employeeInput;
}

async officeNumberInput(employeeInput){
    let managerInput=
    await inquirer
    .prompt([
        {type:"input", message: "Office Number: ", name: "officeNumber"}
    ]);
    employeeInput.officeNumber = await managerInput.officeNumber;
    return employeeInput;
}

async getGithubUser(employeeInput){
    let engineerInput=
    await inquirer
    .prompt([
        {type:"input", message: "Your GitHub Username: ", name: "github"}
    ]);
    employeeInput.github = await engineerInput.github;
    return employeeInput;
}

async getSchoolAtt(employeeInput){
    let internInput=
    await inquirer
    .prompt([
        {type:"input", message: "School Attend(ed/ing): ", name: "school"}
    ]);
    employeeInput.school = await internInput.school;
    return employeeInput;
}

newEmployee(employeeInput){
    let employee;
    const {id, name, email}= employeeInput;
    switch(employeeInput.title.toLowerCase()){
        case "manager":
            const manager= new Manager(name, id, email, employeeInput.officeNumber);
            employee=manager;
        case "engineer":
            const engineer= new Engineer(name, id, email, employeeInput.github);
            employee=engineer;
        case "intern":
            const intern= new Intern(name, id, email, employeeInput.school);
            employee=intern;
    }
    return employee;
}