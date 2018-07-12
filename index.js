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
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    selection();
});

function selection() {

    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Buy something",
                "Find out how many are in stock",
                "Find item cost",
            ]
        })
        .then(function (res) {

            switch (res.selection) {
                case "Buy something":
                    order();
                    break;

                case "Find item cost":
                    cost();
                    break;

                case "Find out how many are in stock":
                    stockNum();
                    break;

                default:
                    console.log("Thanks for making a selection.")

            }
        })

}

function order() {

    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "item",
                type: "list",
                message: "What would you like to purchase?",
                choices: [
                    "Pizza",
                    "Bread",
                    "Milk",
                    "Vacuum",
                    "Rug",
                    "Tires",
                    "Oil",
                    "Hat",
                    "Jeans",
                    "Shoes"
                ]
            },
            {
                name: "number",
                type: "input",
                message: "How many would you like to order?",

            }])
            .then(function (answer) {
                console.log(answer);
                var itemCount;
                var total;
                var itemsRemaining;
                var item = answer.item;
                var itemsOrdered = parseInt(answer.number);

                for (var i = 0; i < res.length; i++) {
                    itemCount = +(res[i].item_quantity);
                    itemsRemaining = itemCount - itemsOrdered;
                    total = parseInt(+(res[i].item_cost) * itemsOrdered);
                }

                console.log(answer.number + " " + item + " Selected for purchase.");
                console.log("$" + total);
                console.log(itemsRemaining + " Remaining in inventory.");


                if (answer.number > itemsRemaining) {
                    console.log("Sorry, we do not have enough units to complete your order request.");
                    selection();
                } else {
                    connection.query(
                        "UPDATE Products SET ? WHERE ?", [{

                            item_quantity: itemsRemaining
                            //need to decrement Products by the number entered by user
                        },
                        {
                            item_name: item
                        }
                        ],
                        function (err) {
                            if (err) throw err;

                            console.log("Your order was submitted successfully. Thank you!")
                            console.log("=================================================")
                            selection();
                        }
                    );
                }

            })
    })
}

function cost() {

    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;

        inquirer.prompt({

            name: "item",
            type: "list",
            message: "What item's price would you like to check?",
            choices: [
                "Pizza",
                "Bread",
                "Milk",
                "Vacuum",
                "Rug",
                "Tires",
                "Oil",
                "Hat",
                "Jeans",
                "Shoes"
            ]
        })
            .then(function (answer) {

                connection.query("SELECT * FROM Products WHERE item_name=?", [answer.item], function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].item_name + " | " + "$" + res[i].item_cost);
                    }
                    selection();
                })

            })

    })
}

function stockNum() {

    connection.query(
        "SELECT * FROM Products", function (err, res) {
            if (err) throw err + "unable to calculate quantity";

            for (var i = 0; i < res.length; i++) {

                console.log(res[i].id + " | " + res[i].item_name + " | " + "Currently: " + res[i].item_quantity + " in stock.");

            }
            selection();
        })

}