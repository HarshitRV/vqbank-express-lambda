import mongoose, { Model, Schema, SchemaOptions } from "mongoose";
import { IUser, ROLES } from "./types";
import * as argon2 from "argon2";
import { DocPaper } from "../paper";

const DocUser = "User" as const;

const userSchemaOptions: SchemaOptions = { toJSON: { virtuals: true }, timestamps: true };

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: ROLES.USER,
        enum: [...Object.values(ROLES)],
    },
    otp: {
        type: String,
        trim: true
    },
    purchasedPapers: [
        {
            type: Schema.Types.ObjectId,
            ref: DocPaper
        }
    ]
}, userSchemaOptions);


/**
 * Before saving hash and salt the password if it has been modified.
 */
userSchema.pre<IUser>('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const passwordHash = await argon2.hash(this.password);
            this.password = passwordHash;
        }

        if (this.otp && this.isModified('otp')) {
            const otpHash = await argon2.hash(this.otp);
            this.otp = otpHash;
        }

        next();
    } catch (err) {
        next(err);
    }
});



/**
 * Compare the hashed password with the password provided.
 */
userSchema.methods.checkPassword = function (password: string) {
    const passwordHash = this.password;
    return argon2.verify(passwordHash, password);
}

userSchema.methods.checkOTP = function (otp: string) {
    const otpHash = this.otp;
    return argon2.verify(otpHash, otp);
}

userSchema.virtual('papers', {
    ref: DocPaper,
    localField: '_id',
    foreignField: 'user',
});

const User: Model<IUser> = mongoose.model<IUser>(DocUser, userSchema);

export { DocUser };
export default User;