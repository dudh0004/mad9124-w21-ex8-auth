import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const secretKey = 'superSecretKey'
const saltRounds = 14

const schema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true},
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true }
})

schema.methods.generateAuthToken = function () {
    const payload = { uid: this._id }
    return jwt.sign(payload, 'superSecureSecret')
}

schema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    delete obj.__v
    return obj
}

schema.statics.authenticate = async function (email, password) {
    const user = await this.findOne({ email: email })

    const badHash = `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
    const hashedPassword = user ? user.password : badHash
    const passwordDidMatch = await bcrypt.compare(password, hashedPassword)

    return passwordDidMatch ? user : null
}

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})

const Model = mongoose.model('User', schema) 

export default Model