import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";


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
import { TProducts, TUsers } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// Get All Users
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// Get All Products
app.get('/products', (req: Request, res: Response) => {

    const nameToFind = req.query.name as string;

    if (nameToFind) {
        const result: TProducts[] = products.filter((product) => 
            product.name.toLowerCase().includes(nameToFind.toLowerCase())
        );
        res.status(200).send(result)
    } else {
        res.status(200).send(products)
    }
})

// Create User
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const result: string = createUser(id, name, email, password)
    res.status(201).send(result)
})

// Create Product
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

//Delete User By Id
app.delete('/users/:id', (req: Request, res: Response) => {
    const userIdToDelete = req.params.id

    const userIdIndex = users.findIndex((user) => user.id === userIdToDelete)

    if(userIdIndex >= 0){
        users.splice(userIdIndex, 1)
    }

    res.status(200).send("User apagado com sucesso")
})

// Delete Product By Id
app.delete('/products/:id', (req: Request, res: Response) => {
    const productToDelete = req.params.id
    
    const productIdIndex = products.findIndex((product) => product.id === productToDelete)

    if(productIdIndex >= 0){
        products.splice(productIdIndex, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

// Edit Product by id
app.put('/products/:id', (req: Request, res: Response) => {
    const idToEdit = req.params.id

    const newId = req.body.id as string
    const newName = req.body.name as string
    const newPrice = req.body.price as number
    const newDescription = req.body.description as string
    const newImageUrl = req.body.imageUrl as string

    const product = products.find((product) => product.id === idToEdit)

    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizado com sucesso")
})

