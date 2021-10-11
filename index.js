import express from "express";
import request from "request";
import {join} from "path";
import path from 'path';
import fetch from "node-fetch"; //importing fetch api




const app = express();
const __dirname = path.resolve(path.dirname(''));




// var ManagementClient = require('auth0').ManagementClient;
import { ManagementClient } from "auth0";

var auth0 = new ManagementClient({
    domain: 'YOUR_DOMAIN',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    scope: 'read:users update:users'
});


//access token code
import pkg from 'auth0';
const { AuthenticationClient } = pkg;


var auth0 = new AuthenticationClient({
    domain: 'YOUR_DOMAIN',
    clientId: 'YOUR_CLIENT_ID', //noninteractive client id
    clientSecret: 'CLIENT_SECRET'
});

//defining localStorage
import pkg1 from "node-localstorage";
const { LocalStorage} = pkg1;

var localStorage = new LocalStorage('./scratch');


auth0.clientCredentialsGrant(
    {
        audience: 'https://melandalin.us.auth0.com/api/v2/',
        scope:  'read:users update:users'
    },
    function(err, response) {
        if (err) {
      // Handle error.
        }
        var myToken = (response.access_token);
        localStorage.setItem("myToken", myToken);
        localStorage.setItem("first", "name");
    }
);



//////GENERATE RULES BY CALLING MANAGEMENT API BELOW
// var request = require("request"); //requests bearer management API token, should work
import pkg2 from "request";
const { request1 } = pkg2; 


var options = { method: 'POST',
    url: 'YOUR_DOMAIN',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"YOUR_CLIENT_ID","client_secret":"YOUR_CLIENT_SECRET","audience":"YOUR_API_DOMAIN","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    // console.log(body);

    });



//grabs automatic management api token and applies it to data retrieval

var thisToken = localStorage.getItem("myToken");
var myToken = thisToken;


// var axios = require("axios").default;
import axios from "axios";


var options = {
    method: 'GET',
    url: 'https://melandalin.us.auth0.com/api/v2/rules', //Bearer token allows for Managment API access, manual works
    headers: {'content-type': 'application/json', authorization: 'Bearer '+ myToken}, //add a variable to swap in a new token
    scope: 'read:rules',
    };

console.log("...");

axios.request(options).then(function (response) {
    // console.log(response.data);
    var userRules = response.data;
    localStorage.setItem("rules",JSON.stringify(userRules));//saving rules to scratch
    }).catch(function (error) {
    console.error(error);
});


var options = {
    method: 'GET',
    url: 'https://melandalin.us.auth0.com/api/v2/clients', //Bearer token allows for Managment API access, manual works
    headers: {'content-type': 'application/json', authorization: 'Bearer '+ myToken}, //add a variable to swap in a new token
    scope: 'read:clients',
    };

console.log("...");

axios.request(options).then(function (response) {
    // console.log(response.data);
    var userClients = response.data;
    localStorage.setItem("clients",JSON.stringify(userClients));//saving rules to scratch
    }).catch(function (error) {
    console.error(error);
});


////render our DOM
const updateUI = async () => {
    // code...
        var x = document.getElementById("app");   // Get the element with id
        x.style.color = "red";  
};


////CLIENTS data retrieval
app.listen(7000, () => {
    console.log(`Server is up and running on 7000 ...`);
    });
    
app.get("/", (req, res) => {
        let data = (localStorage.getItem("clients"));
    res.send(data);
});

// xhr.send(data);
var myUrl = "http://localhost:7000/";
import XMLHttpRequest from "xhr2";

var xhr = new XMLHttpRequest();
xhr.open("POST", myUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json');




