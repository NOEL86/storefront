var inquirer = require("inquirer");
var mysql = require('mysql');
var config = require('./config');



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: config.password,
    database: "store_frontDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");

    selection();
});

function selection() {
    inquirer.prompt({
        name: "selection",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Make an order",
            "Find out how many are in stock",
            "Find the item cost",
            "Find the products sales total"
        ]
    })
        .then(function (res) {

            switch (res.selection) {
                case "Make an order":
                    order();
                    break;

                case "Find out how many are in stock":
                    stockNum();
                    break;

                case "Find the products sales total":
                    sales();
                    break;

                default:
                    console.log("Thanks for making a selection.")
            }
        })

}

function order() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "What department is your item in?"

    },
    {
        name: "item",
        type: "input",
        message: "What would you like to order?"

    },
    {
        name: "number",
        type: "input",
        message: "How many would you like to order?"
    }])
        .then(function (res) {

            connection.query(
                "INSERT INTO Inventory SET ?", {
                    item_name: res.item,
                    item_department: res.department,
                    item_count: res.number

                },
                function (err) {
                    if (err) throw err + "Order not entered";
                    console.log("Your order was accepted.");
                    //need to decrement inventory by the number entered by user

                    selection();
                }
            )

        })
}

function stockNum() {
    var itemOrdered;

    inquirer.prompt({
        name: "item",
        type: "input",
        message: "What item would you like to check on?",


    })
        .then(function (res) {

            connection.query(
                "UPDATE Inventory SET ? WHERE ?", [{
                    item_count: res.number
                },
                {
                    id: itemOrdered.id
                }
                ],
                function (err) {
                    if (err) throw err + "unable to calculate quantity";
                    console.log("Currently: " + item_count + "in stock.");
                    selection();
                }

            )
        })


}


function sales() {
    inquirer.prompt({

    })
        .then(function (res) {

        })
}