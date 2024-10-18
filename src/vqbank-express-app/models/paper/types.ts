import mongoose from "mongoose";

export interface IPaper extends mongoose.Document {
    fieldname?: string;
    originalname: string;
    encoding?: string;
    mimetype?: string;
    buffer: Buffer;
    size: number;
    user: mongoose.Types.ObjectId;
    views: number;
    semester: string;
    assessmentType: string;
    courseTitle: string;
    programmeName: string;
    visibility: boolean;
}