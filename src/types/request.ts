import { Request } from "express"

interface CustomRequest extends Request {
    user?: string | undefined
}

export default CustomRequest