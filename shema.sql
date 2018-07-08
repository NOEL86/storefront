
CREATE database store_frontDB;

USE store_frontDB;

CREATE TABLE Inventory
(
    id INT NOT NULL
    AUTO_INCREMENT,
    item_name VARCHAR
    (50) NOT NULL,
    item_department VARCHAR
    (50) NOT NULL,
    item_count INT
    (100) NOT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO Inventory
        (item_name, item_department, item_count)
    VALUES("Vacuum", "Home Goods", 50);

    INSERT INTO Inventory
        (item_name, item_department, item_count)
    VALUES("Milk", "Food", 35);

    INSERT INTO Inventory
        (item_name, item_department, item_count)
    VALUES("Bread", "Food", 50);


    SELECT *
    FROM Inventory;