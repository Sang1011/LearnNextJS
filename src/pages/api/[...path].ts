import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy';
import Cookies from "cookies";

// type Data = {
//     name: string
// }

export const config = {
    api: {
        bodyParser: false
    }
}
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return new Promise((resolve) => {
        const cookies = new Cookies(req,res);
        const accessToken = cookies.get('access_token');

        if(accessToken){
            req.headers.authorization = `Bearer ${accessToken}`
        }

    req.headers.cookie = "";

    if (req.url?.startsWith('/api/')) {
        req.url = req.url.replace('/api', '');  // Xóa /api khỏi local URL, hoặc thay bằng URL mới
        console.log("url ",req.url)
        // Bây giờ yêu cầu /api/products hoặc /api/carts sẽ được chuyển thành /products, /carts
    }
    proxy.web(req, res, {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        selfHandleResponse: false
    })

    proxy.once('proxyRes', () => {
        resolve(true)
    })

    })
    
    
    
    // res.status(200).json({name: "PATH - match all"})
}