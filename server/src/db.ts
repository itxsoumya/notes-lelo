import mongoose, { Schema, Types, model } from "mongoose"
import dotenv from 'dotenv';

dotenv.config();
const DB_URI = process.env.DB_URI;
// console.log('----------------------db url: '+DB_URI )

mongoose.connect(DB_URI!).then(() => {
  console.log('[+] db connected...')
})

interface UserInterface {
  name: string,
  username: string,
  secretCode: string,
  isAdmin: boolean,
  isManager: boolean
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 2,
  },
  secretCode: {
    type: String,
    required: true,
    unique: true,
    maxlength: 5,
    minlength: 5
  },
  isAdmin: {
    type: Boolean,

    default: false

  },
  isManager: {
    type: Boolean,

    default: false
  }
}, { timestamps: true });

const User = model<UserInterface>('User', UserSchema)




interface NotesInterface {
  title: string,
  auther: Types.ObjectId,
  fileUrl: string,
  semester: number,
  section: string,
  subject: string,
  module: number
}

const NotesSchema = new Schema<NotesInterface>({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 70,
  },
  auther: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  fileUrl: { type: String, required: true },
  semester: {
    type: Number,
    required: true,
  },
  module: {
    type: Number, required: true,
  },
  section: { type: String, required: true },
  subject: { type: String, required: true }
}, { timestamps: true })

const Note = model<NotesInterface>('Note', NotesSchema);

export { User, Note }
