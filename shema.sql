
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE Products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    item_name VARCHAR
    (50) NOT NULL,
    item_department VARCHAR
    (50) NOT NULL,
    item_cost INT
    (1000) NOT NULL,
    item_quantity INT
    (100) NOT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Vacuum", "Home Goods", 150, 25);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Pizza", "Food", 10, 100);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Milk", "Food", 3, 50);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Tires", "Automotive", 50, 25);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Shoes", "Apparel", 25, 20);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Bread", "Food", 3, 50);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Oil", "Automotive", 7, 25);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Rug", "Home Goods", 75, 10);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Jeans", "Apparel", 25, 15);

    INSERT INTO Products
        (item_name, item_department, item_cost, item_quantity)
    VALUES("Hat", "Apparel", 15, 10);


    SELECT *
    FROM Products;