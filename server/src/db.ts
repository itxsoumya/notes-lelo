import mongoose, { Schema, Types, model } from "mongoose"

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI!).then(() => {
    console.log('[+] db connected...')
})

interface UserInterface {
    name: string,
    username: string,
    secretCode: string
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
    }
}, { timestamps: true });

const User = model<UserInterface>('User', UserSchema)


interface ManagerInterface {
    userId: Types.ObjectId
}

const ManagerSchema = new Schema<ManagerInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref:User
    }
}, { timestamps: true })

const Manager = model<ManagerInterface>('Manager', ManagerSchema);



interface AdminInterface {
    userId: Types.ObjectId
}

const AdminSchema = new Schema<AdminInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref:User
    }
}, { timestamps: true })

const Admin = model<AdminInterface>('Admin', AdminSchema);




interface NotesInterface {
    title: string,
    auther: Types.ObjectId,
    fileUrl: string
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
    fileUrl: { type: String, required: true }
}, { timestamps: true })

const Notes = model<NotesInterface>('Note', NotesSchema);

export { User, Notes, Admin, Manager }