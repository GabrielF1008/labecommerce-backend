"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = void 0;
let data = new Date();
let newDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
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