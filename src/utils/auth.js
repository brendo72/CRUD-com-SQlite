import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET
export async function hashpassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)

}
export function generatetoken(user){
    return jwt.sign(
        {id: user.id, email:user.email},
        JWT_SECRET,
        {expiresIn:"1h"}
    )
}