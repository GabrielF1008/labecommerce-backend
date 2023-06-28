"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = exports.getAllUsers = exports.getAllProducts = exports.createUser = exports.createProduct = exports.searchProductsByName = void 0;
let data = new Date();
let newDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
const searchProductsByName = (name) => {
    const result = exports.products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
    return result;
};
exports.searchProductsByName = searchProductsByName;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id,
        price,
        name,
        description,
        imageUrl
    };
    exports.products.push(newProduct);
    console.log("Produto adicionado com sucesso");
};
exports.createProduct = createProduct;
const createUser = (id, name, email, password) => {
    const newUser = {
        id,
        email,
        name,
        password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
exports.users = [
    {
        id: "User01",
        name: "Gabriel",
        email: "gabriefelpe1009@gmail.com",
        password: "51514444",
        createdAt: newDate.toISOString(),
    },
    {
        id: "User02",
        name: "Guilherme",
        email: "guilherme1009@gmail.com",
        password: "122122122",
        createdAt: newDate.toISOString(),
    }
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
//# sourceMappingURL=database.js.map