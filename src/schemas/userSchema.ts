import { Schema } from 'mongoose';
import { Transform } from 'stream';

export const userSchema: Schema = new Schema({
  createdAt: Date,
  id: String,
  email: String,
  firstName: String,
  lastName: String
}, {
    toJSON: {
      transform: function (ret) {
        ret._id = ret._id.toJSON();
        delete ret.__v;
      }
    }
  }

);

userSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});
