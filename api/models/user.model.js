import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?t=st=1713071266~exp=1713074866~hmac=252fb4fb4d5ab45e79784e893cf6b18da4f9217c6cf3186124460c9034ada2d2&w=1060'
    },
}, { timestamps: true });
 const User = mongoose.model('User', userSchema);
 export default User;