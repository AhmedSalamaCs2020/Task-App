const password = 'Red12345!'
var bcrypt = require('bcryptjs');

const encurption=async(password)=>{
    const hashedPassword = await bcrypt.hash(password, 8)
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return hashedPassword
}
encurption(password)
