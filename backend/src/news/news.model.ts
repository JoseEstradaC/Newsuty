import { Schema } from 'mongoose';

export interface News {
  id: string;
  userID: string;
  url: string;
  urlImagen: string;
  titulo: string;
  likes: string[];
  dislikes: string[];
  countLikes: number;
  countDislikes: number;
}

const NewsSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    urlImagen: {
      type: String,
      required: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [String],
      trim: true,
      default: [],
    },
    dislikes: {
      type: [String],
      trim: true,
      default: [],
    },
    countLikes: {
      type: Number,
      trim: true,
      default: 0,
    },
    countDislikes: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

NewsSchema.pre<News>('save', async function (next) {
  try {
    this.countLikes = this.likes.length;
    this.countDislikes = this.dislikes.length;
    next();
  } catch (e) {
    next(e);
  }
});

NewsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.likes;
    delete ret.dislikes;
    delete ret.updatedAt;
  },
});

export { NewsSchema };
