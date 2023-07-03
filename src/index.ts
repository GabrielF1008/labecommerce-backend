import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName} from "./database";

console.log("GETALLUSERS")
console.table(getAllUsers())

console.log("CREATEUSER")
createUser("User03", "Fulano", "fulanodetal@gmail.com", "fulanodetal123")

console.log("GETALLUSERS")
console.table(getAllUsers())

console.log("GETALLPRODUCTS")
console.table(getAllProducts())

console.log("CREATEPRODUCT")
createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-f-YLiaX_2VdCQq3atkPdf2BYlexd289EPCugFlhUg&s")

console.log("GETALLPRODUCTS")
console.table(getAllProducts())

console.log("SERACHPRODUCTSBYNAME_GAMER")
console.table(searchProductsByName("gamer"))