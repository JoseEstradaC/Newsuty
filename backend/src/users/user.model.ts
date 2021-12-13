import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export enum Roles {
  admin = 'admin',
  user = 'user',
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: Roles;
  validatePassword(password: string): boolean;
}

const SALT = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Roles,
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: false,
  },
);

UserSchema.pre<User>('save', async function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, SALT);
    next();
  } catch (e) {
    next(e);
  }
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export { UserSchema };
