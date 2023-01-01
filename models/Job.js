import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, 'Provide all values'],
      maxLength: 35,
    },
    position: {
      type: String,
      require: [true, 'Provide all values'],
      maxLength: 90,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      required: true,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
