import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, {
    timeStamp
})

export default mongoose.model("admin", adminSchema);