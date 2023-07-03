import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName} from "./database";


// console.table(getAllUsers())

// createUser("User03", "Fulano", "fulanodetal@gmail.com", "fulanodetal123")


// console.table(getAllUsers())

// console.table(getAllProducts())

// console.log("CREATEPRODUCT")
// createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-f-YLiaX_2VdCQq3atkPdf2BYlexd289EPCugFlhUg&s")

// console.table(getAllProducts())

// console.table(searchProductsByName("gamer"))

import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUsers } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// method HTTP (GET)
// path ("/users")
// response
// status 200
// array de users do database.ts

// Get All Users
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// Get All Products
// Caso seja recebido um termo de busca no query params name, a resposta da API será a lista filtrada baseada no nome dos produtos. Caso a query params chegue undefined, continua sendo devolvida a lista de todos os produtos.
// method HTTP (GET)
// path ("/product")
// query params
// name
// response
// status 200
// array do resultado da busca ou todos os produtos

app.get('/products', (req: Request, res: Response) => {
    const name = req.query.name as string

    const result = products.filter(
        (product) => product.name.toLowerCase().includes(name.toLowerCase())
    )
    // res.status(200).send(result)
    result ? res.status(200).send(result) : res.status(200).send(products)
})

// Create User
// method HTTP (POST)
// path ("/users")
// body
// id
// name
// email
// password
// response
// status 201
// "Cadastro realizado com sucesso"
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const result : string = createUser(id, name, email, password)
    res.status(201).send(result)
})

// Create Product
// method HTTP (POST)
// path ("/products")
// body
// id
// name
// price
// description
// imageUrl
// response
// status 201
// "Produto cadastrado com sucesso"
app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})