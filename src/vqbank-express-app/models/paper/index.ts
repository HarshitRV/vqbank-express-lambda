import mongoose, { Schema, SchemaOptions } from "mongoose";
import { IPaper } from "../paper/types";

const DocPaper = "Paper" as const;

const paperSchemaOptions: SchemaOptions = { timestamps: true };

const paperSchema: Schema<IPaper> = new Schema({
    fieldname: {
        type: String,
    },
    originalname: {
        type: String,
        required: true,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    buffer: {
        type: Buffer,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    semester: {
        type: String,
        required: true
    },
    assessmentType: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true,
    },
    programmeName: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true
    }
},
    paperSchemaOptions
);

const Paper = mongoose.model(DocPaper, paperSchema);

export { DocPaper };
export default Paper;
