import Cookies from "cookies"
import { NextApiRequest, NextApiResponse } from "next"

type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method !== "POST"){
        return res.status(404).json({message: 'method not supported'})
    }

    const cookies = new Cookies(req, res);
    if(cookies.get('access_token') == null){
        return res.status(500).json({message: 'You have not login yet'})
    }
    cookies.set('access_token')
    
    res.status(200).json({message: "logout successfully"})
}