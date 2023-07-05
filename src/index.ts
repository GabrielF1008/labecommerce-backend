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
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Get All Products
app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name == undefined) {
            res.status(200).send(products)
        }

        if (name.length < 1) {
            res.status(400)
            throw new Error("Name precisa conter pelo menos um caractere")
        }

        const result = products.filter(
            (product) => product.name.toLowerCase().includes(name.toLowerCase())
        )
        // res.status(200).send(result)
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

    }
})

// Create User
app.post('/users', (req: Request, res: Response) => {

    try {
        const id = req.body.id as string 
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        const result: string = createUser(id, name, email, password)

            if(typeof id !== "string"){
                throw new Error("'id' deve ser uma string")
            }
            if (id.length < 1) {
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }

            if(typeof name !== "string"){
                throw new Error("'name' deve ser uma string")
            }
            if (name.length < 1) {
                throw new Error("'name' deve possuir no mínimo 1 caractere")
            }

            if(typeof email !== "string"){
                throw new Error("'email' deve ser uma string")
            }
            if (email.length < 1) {
                throw new Error("'email' deve possuir no mínimo 1 caractere")
            }

            if(typeof password !== "string"){
                throw new Error("'password' deve ser uma string")
            }
            if (password.length < 1) {
                throw new Error("'password' deve possuir no mínimo 1 caractere")
            }

        res.status(201).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    } 
})

// Create Product
app.post('/products', (req: Request, res: Response) => {

    try {
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

        if(typeof id !== "string"){
            throw new Error("'id' deve ser uma string")
        }
        if (id.length < 1) {
            throw new Error("'id' deve possuir no mínimo 1 caractere")
        }

        if(typeof name !== "string"){
            throw new Error("'name' deve ser uma string")
        }
        if (name.length < 1) {
            throw new Error("'name' deve possuir no mínimo 1 caractere")
        }

        if(typeof price !== "number"){
            throw new Error("'price' deve ser um number")
        }
        if (price === undefined) {
            throw new Error("'price' deve possuir no mínimo 1 caractere")
        }

        if(typeof description !== "string"){
            throw new Error("'description' deve ser uma string")
        }
        if (description.length < 1) {
            throw new Error("'description' deve possuir no mínimo 1 caractere")
        }

        if(typeof imageUrl !== "string"){
            throw new Error("'imageUrl' deve ser uma string")
        }
        if (imageUrl.length < 1) {
            throw new Error("'imageUrl' deve possuir no mínimo 1 caractere")
        }
    
        res.status(201).send("Produto cadastrado com sucesso") 
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    } 
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

