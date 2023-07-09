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

        const idIsUsed = users.find((user) => {
            return user.id === id
        })

        const emailIsUsed = users.find((user) => {
            return user.email === email;
        });

        const result: string = createUser(id, name, email, password)

        if (idIsUsed) {
            res.status(400)
            throw new Error('Id já está cadastrado')
        }

        if (emailIsUsed) {
            res.status(400);
            throw new Error("Email já cadastrado!");
        }

        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string")
        }
        if (id.length < 1) {
            throw new Error("'id' deve possuir no mínimo 1 caractere")
        }

        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string")
        }
        if (name.length < 1) {
            throw new Error("'name' deve possuir no mínimo 1 caractere")
        }

        if (typeof email !== "string") {
            throw new Error("'email' deve ser uma string")
        }
        if (email.length < 1) {
            throw new Error("'email' deve possuir no mínimo 1 caractere")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser uma string")
        }
        if (password.length < 1) {
            throw new Error("'password' deve possuir no mínimo 1 caractere")
        }
        if (idIsUsed) {
            res.status(400).send(users)
        } else {
            res.status(201).send(result)
        }

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

        const idIsUsed = products.find((product) => {
            return product.id === id;
        });

        if (idIsUsed) {
            res.status(400);
            throw new Error("Id já cadastrado!");
        }

        products.push(newProduct)

        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string")
        }
        if (id.length < 1) {
            throw new Error("'id' deve possuir no mínimo 1 caractere")
        }

        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string")
        }
        if (name.length < 1) {
            throw new Error("'name' deve possuir no mínimo 1 caractere")
        }

        if (typeof price !== "number") {
            throw new Error("'price' deve ser um number")
        }
        if (price <= 0) {
            throw new Error("'price' deve ser maior que zero")
        }

        if (typeof description !== "string") {
            throw new Error("'description' deve ser uma string")
        }
        if (description.length < 1) {
            throw new Error("'description' deve possuir no mínimo 1 caractere")
        }

        if (typeof imageUrl !== "string") {
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

    try {
        const userIdToDelete = req.params.id

        const userExist = users.find((user) => {
            return user.id === userIdToDelete
        })

        if (!userExist) {
            res.status(404)
            throw new Error('Id não encontrada')
        }

        const userIdIndex = users.findIndex((user) => user.id === userIdToDelete)

        if (userIdIndex >= 0) {
            users.splice(userIdIndex, 1)
        }

        if (userIdIndex === -1) {
            res.status(404).send("Usuário não encontrado")
            return
        }

        res.status(200).send("User apagado com sucesso")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Delete Product By Id
app.delete('/products/:id', (req: Request, res: Response) => {
    const productToDelete = req.params.id

    const productExist = products.find((product) => {
        return product.id === productToDelete;
    });

    if (!productExist) {
        res.status(404);
        throw new Error("Id não encontrado");
    }

    const productIdIndex = products.findIndex((product) => product.id === productToDelete)

    if (productIdIndex === -1) {
        res.status(404).send("Produto não encontrado")
        return
    }

    if (productIdIndex >= 0) {
        products.splice(productIdIndex, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

// Edit Product by id
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const product = products.find((product) => {
            return product.id === idToEdit;
        });

        if (!product) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }

        const idIndex = products.findIndex((product) => product.id === idToEdit)

        if (idIndex === -1) {
            res.status(404).send("Produto não encontrado")
            return
        }

        const newId = req.body.id as string
        const newName = req.body.name as string
        const newPrice = req.body.price as number
        const newDescription = req.body.description as string
        const newImageUrl = req.body.imageUrl as string

        if (typeof newId === "number") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'name' deve ser do tipo string")
        }

        if (typeof newPrice !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo number")
        }

        if (typeof newDescription !== "string") {
            res.status(400)
            throw new Error("'description' deve ser do tipo string")
        }

        if (typeof newImageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' deve ser do tipo string")
        }

        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error: any) {
        console.log(error)
        res.send(error.message)
    }
})

    