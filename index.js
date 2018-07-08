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
    console.log("Connected");

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
                "Find how many have been sold"
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

                case "Find how many have been sold":
                    salesTotal();
                    break;

                default:
                    console.log("Thanks for making a selection.")
            }
        })

}

function order() {

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
            message: "How many would you like to order?"
        }])
        .then(function (res) {
            if (err) throw err + "promise issue on ordering";
            var itemCount;
            itemCount = item_count - res.number;

            if (res.number > itemCount) {
                console.log("Sorry, we do not have enough units to complete your order request.");
                selection();
            } else {
                connection.query(
                    "UPDATE Products SET ?", {
                        item_count: itemCount,

                        //need to decrement Products by the number entered by user
                    })
                console.log(item_count);
                console.log("Your order was submitted successfully./nThank you!")

            }
        })
}



function cost() {

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
        .then(function (err) {
            if (err) throw err + "cost function not working";

            connection.query("SELECT item_cost * FROM Products", function (err, res) {
                if (err) throw err + "Not selected from Products Table";

                console.log(res.item_cost);


            })
        })
}

// function stockNum() {
// var itemOrdered;

// inquirer.prompt({
//     name: "item",
//     type: "input",
//     message: "What item would you like to check on?",


// })
//     .then(function (res) {

//         connection.query(
//             "UPDATE Products SET ? WHERE ?", [{
//                 item_count: 
//                 }
//                 {
//                 id: itemOrdered.id
//             },
//             ]
//                 function (err) {
//                 if (err) throw err + "unable to calculate quantity";
//                 console.log("Currently: " + item_count + "in stock.");
//                 selection();
//             }

//         )
//     })


// }


function salesTotal() {
    inquirer.prompt({

    })
        .then(function (res) {

        })
}