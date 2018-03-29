import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'
const expires = 3600 * 3

interface JwtPayload {
  id: number;
  role: string;
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: expires })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload 
