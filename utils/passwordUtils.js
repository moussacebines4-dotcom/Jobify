import bcrypt from "bcryptjs";
export async function hashPassword(passWord){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(passWord,salt)
    return hashedPassword
}

export async function comparePassword(passWord,hashedPassword){
    const isMatch = await bcrypt.compare(passWord,hashedPassword)

    return isMatch
}
