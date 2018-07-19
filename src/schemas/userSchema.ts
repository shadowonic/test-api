import { Schema } from 'mongoose';
import { IUserModel } from '../interfaces';
import { authService } from '../sevices';

export const userSchema: Schema = new Schema(
  {
    createdAt: Date,
    id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    hash: String
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toJSON();
        delete ret.__v;
        delete ret.hash;
      }
    }
  }
);

userSchema.pre<IUserModel>('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});
