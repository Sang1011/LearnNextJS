import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string
}

export default function handler(reg: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({name: "Get detail products"})
}