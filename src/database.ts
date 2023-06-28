import { TProducts, TUsers } from "./types";


let data = new Date(); // Data e hora atual da região

let newDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000); // o data.valueOf() irá retornar a data em ms (milisegundos). Então é preciso converter o GMT também em milisegundos: data.getTimezoneOffset() * 6000.

// function createUser(id: string, name: string, email: string, password: string): string {
//     const newUsers = users.push(id, name, email, password)

// 	return (
//        newUsers = users.push(id, name, email, password)
//     )
// }

// export function createUser(id: string, name: string, email: string, password: string): void {
//     const newUser = {
//         id: id,
//         name: name,
//         email: email,
//         password: password,
//         createdAt: new Date().toISOString(),
//     };
//     users.push(newUser);
// }

// createProduct (cria um novo produto na lista de products)
// input: quatro parâmetros (id, name, price, description e imageUrl)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.")

// getAllProducts (busca todos os produtos da lista de products)
// input: nenhum
// output: lista atualizada de products
// exemplo de chamada: getAllProducts()

// searchProductsByName (busca por produtos baseada em seu nome através de um argumento)
// input: um parâmetro (name)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: searchProductsByName("gamer")

export const searchProductsByName = (name: string): TProducts[] => {
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase())
    })
    return result
}

export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): void => {
    const newProduct: TProducts = {
        id,
        price,
        name,
        description,
        imageUrl
    }
    products.push(newProduct)
    console.log("Produto adicionado com sucesso")
}

export const createUser = (id: string, name: string, email: string, password: string): void => {
    const newUser: TUsers = {
        id,
        email,
        name,
        password,
        createdAt: new Date().toISOString()
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export const getAllProducts = () : TProducts[] => {
    return products
}

export const getAllUsers = () : TUsers[] => {
    return users 
} 


export const users: TUsers[] = [
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
]

export const products: TProducts[] = [
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
   
]