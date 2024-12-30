import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy';

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
    req.headers.cookie = ''
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
    
    // res.status(200).json({name: "PATH - match all"})
}