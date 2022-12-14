const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: '/defaults/default.png' },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    isShow: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = new mongoose.model('user', ProjectSchema);

module.exports = {
  ProjectModel,
};
