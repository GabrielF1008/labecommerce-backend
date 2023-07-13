-- Active: 1689169294133@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

SELECT * from users;

PRAGMA table_info ('users');

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Gabriel',
        'gabrielfelipe1009@gmail.com',
        '12345677',
        '12/07/2023'
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u002',
        'Guilherme',
        'guizinho@gmail.com',
        '12345678',
        '12/07/2023'
    ), (
        'u003',
        'Fulano',
        'fulanodetal@gmail.com',
        'fulaninho',
        '12/07/2023'
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

PRAGMA table_info ('products');

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url) 
VALUES (
        'p001',
        'Teclado',
         399.59,
        'fulaninho',
        'https://picsum.photos/id/870/200/300?grayscale&blur=2'
    ),
    (
        'p002',
        'Monitor',
         679.99,
        'fulaninho',
        'https://picsum.photos/id/835/200/300?grayscale&blur=2'
    ),
    (
        'p003',
        'Headset',
         259.99,
        'fulaninho',
        'https://picsum.photos/id/800/200/300?grayscale&blur=2'
    );

-- Get All Users
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

-- Get All Products onde name contém 'gamer'
SELECT * FROM products
    WHERE name like '%gamer%';

-- Create User
INSERT INTO users (id, name, email, password, created_at)
    VALUES ('u004', 'Ciclano', 'ciclano9@gmail.com', '123123231', '12/07/2023');

-- Create Product
INSERT INTO products (id, name, price, description, image_url)
    VALUES ('p004', 'Fone de ouvido', 79.90, 'Fone muito bom', 'blablabla');

-- Delete User by id
DELETE FROM users
WHERE id = 'u001';

-- Delete Product by id
DELETE FROM products
WHERE id = 'p001';

-- Edit Product by id
UPDATE products
    SET id = 'produto002', 
    name = 'OutraCoisa', 
    price = 0.99, 
    description = 'OutraParada', 
    image_url = 'qualquerCoisa'
    WHERE id = 'p002';

