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
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fman-avatar-profile-picture-vector-illustration_26371636.htm&psig=AOvVaw1Dme_P7dVz-6DiFXAZP0H3&ust=1712982680212000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjS2PTru4UDFQAAAAAdAAAAABAE'
    },
}, { timestamps: true });
 const User = mongoose.model('User', userSchema);
 export default User;