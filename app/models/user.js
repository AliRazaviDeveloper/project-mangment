const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '/defaults/default.png' },
    role: { type: [String], default: ['USER'] },
    username: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model('user', UserSchema);

module.exports = {
  UserModel,
};
