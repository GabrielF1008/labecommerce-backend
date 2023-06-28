"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("GETALLUSERS");
console.table((0, database_1.getAllUsers)());
console.log("CREATEUSER");
(0, database_1.createUser)("User03", "Fulano", "fulanodetal@gmail.com", "fulanodetal123");
console.log("GETALLUSERS");
console.table((0, database_1.getAllUsers)());
console.log("GETALLPRODUCTS");
console.table((0, database_1.getAllProducts)());
console.log("CREATEPRODUCT");
(0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-f-YLiaX_2VdCQq3atkPdf2BYlexd289EPCugFlhUg&s");
console.log("GETALLPRODUCTS");
console.table((0, database_1.getAllProducts)());
console.log("SERACHPRODUCTSBYNAME_GAMER");
console.table((0, database_1.searchProductsByName)("gamer"));
//# sourceMappingURL=index.js.map