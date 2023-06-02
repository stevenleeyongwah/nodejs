import mongoose, { mongo } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

userSchema.pre("save", function (next) {
    const user = this

    if (!user.isModified("password")) return next()
    if (user.isModified("password")) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

userSchema.methods.comparePassword = function (
    candidatePassword: string,
    cb: (arg: any, isMatch?: boolean) => void
) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

const User = mongoose.model("User", userSchema)

export default User