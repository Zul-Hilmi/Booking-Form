import jwt from 'jsonwebtoken';
interface Token extends jwt.JwtPayload {
    id?: string
}

export const getUser = async (token: any) => {
    if (typeof token === 'undefined') {
        return false;
    }
    try {
        const decoded: Token = jwt.verify(token, import.meta.env.AUTH_TOKEN) as Token;
        return true
    } catch (err) {
        console.log(err)
    }

    return false;
}
