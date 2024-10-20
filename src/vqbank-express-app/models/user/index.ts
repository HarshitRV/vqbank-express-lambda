import mongoose, { Model, Schema, SchemaOptions } from "mongoose";
import { IUser, ROLES } from "./types";
import { DocPaper } from "../paper";
import bcrypt from 'bcryptjs';

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
        const salt = bcrypt.genSaltSync();

        if (this.isModified('password')) {
            this.password = bcrypt.hashSync(this.password, salt);
        }

        if (this.otp && this.isModified('otp')) {
            this.otp = bcrypt.hashSync(this.otp, salt);
        }

        next();
    } catch (err) {
        next(err);
    }
});



/**  Compare the hashed password with the password provided */
userSchema.methods.checkPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
}

/** Compare the hashed otp with the otp provided */
userSchema.methods.checkOTP = function (otp: string): boolean {
    return bcrypt.compareSync(otp, this.otp);
}

userSchema.virtual('papers', {
    ref: DocPaper,
    localField: '_id',
    foreignField: 'user',
});

const User = mongoose.model(DocUser, userSchema);

export { DocUser };

export default User;