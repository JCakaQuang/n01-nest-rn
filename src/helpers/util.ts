const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function hashPasswordHelper(plainPassword: string): Promise<string | undefined> {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}


export async function comparePasswordHelper(plainPassword: string, hashPassword: string): Promise<string | undefined> {
    try {
        return await bcrypt.compare(plainPassword, hashPassword);
    } catch (error) {
        console.error(error);
    }
}