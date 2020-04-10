#!/usr/bin/env node
const pkg = require('../package.json');
const IgApiClient = require('instagram-private-api').IgApiClient;
const inquirer = require('inquirer');

const ig = new IgApiClient();
console.log("initialised");

async function login() {
	var username = await inquirer.prompt({
        name : "username",
        message : "Please enter your username: "
    });
    
    ig.state.generateDevice(username.username);
    
    var password = await inquirer.prompt({
        name : "password",
        message : "Please enter your password: ",
        type: "password"
    });
    
    let loginResult = 'Logged in';
    try {
    	const loggedInUser = await ig.account.login(username.username,password.password);
	}
	catch(e) {
		switch(e.name) {
			case 'IgLoginInvalidUserError':
			{
				loginResult = 'Sorry, this user does not exist';
			}
			break;
			case 'IgLoginBadPasswordError':
			{
				loginResult = 'Sorry you entered an incorrect password';
			}
			break;
			case 'RequestError':
			{
				loginResult = 'Error logging in. Please check your connection';
			}
			break;
			default:
			{
				loginResult = 'Unknown error, the error returned was '+e.name+'.';
			}
			break;
		}
	}
	console.log(loginResult);
}

(async() => {
    await login();
})();
