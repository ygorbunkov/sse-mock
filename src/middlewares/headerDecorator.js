import { sseHeaders } from "./constants.js"

export const headerDecorator = (req, res, next) => {
    Object
        .keys(sseHeaders)
        .forEach(header => {
            res.setHeader(header, sseHeaders[header])
        })
    
    next()
}