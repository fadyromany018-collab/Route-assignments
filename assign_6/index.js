const express = require("express")
const mysql =require("mysql2")
const app = express() 
app.use(express.json())

    const connection =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Default XAMPP password is empty
        database: 'assignment_6'
    });

connection.on("error",(error)=>{
  console.log(error);
})
//q2------------------------------

async function addColumn() {
  
        const sql = "ALTER TABLE `products_table` ADD `category` VARCHAR(100) NOT NULL";
         connection.execute(sql ,(err,result)=>{

          if(err){
             console.error("Error adding column:", err.sqlMessage);
          }
          else{
            console.log("Column 'category' added successfully!");
          }
        }); 
}


//q3--------------------------------

async function RemoveColumn() {
        const sql = "ALTER TABLE `products_table`  DROP COLUMN `category`";


         connection.execute(sql ,(err,result)=>{

          if(err){
             console.error("Error adding column:", err.sqlMessage);
          }
          else{
            console.log("Column 'category' removed successfully!",result);
          }
        }); 
}
RemoveColumn()

//q4--------------------------------
async function toVarChar() {
        const sql = "ALTER TABLE `suppliers` MODIFY `ContactNumber` VARCHAR(15) NOT NULL";


         connection.execute(sql ,(err,result)=>{

          if(err){
             console.error("Error adding column:", err.sqlMessage);
          }
          else{
            console.log("contactNUmber data type is changed to varchar successfully ");
          }
        }); 
}
toVarChar()
//q5------------------------------------
function addnull(){
  const sql="ALTER TABLE `products_table` MODIFY `ProductName` VARCHAR(200) NOT NULL;"
}
//q6)-------------------------------
function insertsupplier(){
//a)-----------------------
  const sql="INSERT INTO `suppliers` (`SupplierName`, `ContactNumber`) VALUES ('FreshFoods', '01001234567');"
//b)
 const products="INSERT INTO `products_table` (`ProductName`, `Price`, `StockQuantity`, `SupplierID`) VALUES ('Milk', 15.00, 50, 1),('Bread', 10.00, 30, 1),('Eggs', 20.00, 40, 1);"
 //c)
 const sale="INSERT INTO `products_table` (`ProductName`, `Price`, `StockQuantity`, `SupplierID`) VALUES ('Milk', 15.00, 50, 1),('Bread', 10.00, 30, 1),('Eggs', 20.00, 40, 1);"
}
//q7)------------------------------
function updateBread(){
const sql="UPDATE `products_table` SET `Price`=25.00 WHERE `ProductName`=`Bread`;"
}
//q8)-----------------------------
function deleteEggs(){
const sql="Delete From `products_table` WHERE `ProductName`=`Eggs`"
}
//q9--------------------------------
function showSales(){
const sql= "SELECT p.ProductName,SUM(s.QuantitySold) AS TotalSold FROM `products_table`p JOIN `Sales`s ON p.ProductID=s.ProductID GROUP BY p.ProductID, p.ProductName";
}
//q10---------------------------------
function highstSalesproduct(){
const sql="SELECT `ProductName`,`StockQuantity` FROM `Products` ORDER BY `StockQuantity` DESC LIMIT 1" 
}
//q11---------------------------------
function BeginWithF(){
  const sql="SELECT * FROM `suppliers` WHERE `SupplierName` LIKE `F%`"
}
//q12------------------------------------
function SoldProducts(){
  const sql="SELECT p.ProductName FROM `Products`p LEFT JOIN `Sales` s ON p.ProductID = s.ProductID WHERE s.ProductID IS NULL"
}
//q13-------------------------------------
function showproductNameandSales(){
const sql="SELECT p.ProductName, s.SaleDate, s.QuantitySold FROM `Sales`s JOIN `products_table`p ON s.ProductID = p.ProductID "
}
//q14-------------------------------
function createUser(){
       connection.execute("CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '1234'");
        connection.execute("GRANT SELECT, INSERT, UPDATE ON `assignment_6`.* TO 'store_manager'@'localhost'");
        connection.execute("FLUSH PRIVILEGES");
}
//q15-------------------------------------------
function revokeUpdate(){
  const sql = "REVOKE UPDATE ON `assignment_6`.* FROM 'store_manager'@'localhost'";
  connection.execute(sql);
}
//q16--------------------------------
function giveDelete(){
  connection.execute("GRANT DELETE ON `assignment_6`.`Sales` TO 'store_manager'@'localhost'");
   connection.execute("FLUSH PRIVILEGES");
}
//----------------------------------



