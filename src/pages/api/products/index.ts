// import { NextApiRequest, NextApiResponse } from "next";

// enum Role {
//     CUSTOMER = 'CUSTOMER',
//     GUEST = 'GUEST',
//     ADMIN = 'ADMIN',
//     MANAGER = 'MANAGER'
// }

// type User = {
//     name: string,
//     password: string,
//     role: Role
// }

// type Data = {
//     name: string;
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//     // const role = req.query.role; query
//     if(req.method !== 'GET'){
//         return res.status(404).json({
//             name: 'method not supported'
//         })
//     }
//     const {user}: {user?: User} = req.body;

//     if(!user || user.role !== Role.CUSTOMER && user.role !== Role.ADMIN){
//         return res.status(401).json({name: 'Unauthorized'})
//     }
//     res.status(200).json({name: "Get all products"})
// }

import { NextApiRequest, NextApiResponse } from "next";

type Product = {
    id: number,
    title: string,
    price: number
}

type Data = 
    | {products: Array<Product>,
    total: number,
    skip: number,
    limit: number}
    | { name: string};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const role = req.query.role; query
    if(req.method !== 'GET'){
        return res.status(404).json({
            name: 'method not supported'
        })
    }
    const response = await fetch('https://dummyjson.com/products?limit=5&skip=10&select=title,price')
    const responseJSON = await response.json()
    res.status(200).json(responseJSON)
}

// proxy server ==> http-proxy
// * vì việc phải fetch api của từng api lặp lại quá nhiều
// lần nên chúng ta dùng cái này để giảm thiểu sự bất tiện đó