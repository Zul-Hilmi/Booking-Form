import z from 'zod';
import { Schema, model } from 'mongoose';


const validateStaff = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().min(1).email(),
    department: z.string().trim().min(1),
    phone: z.string().trim().min(1)
});

type IStaff = z.infer<typeof validateStaff>;

const staffSchema = new Schema<IStaff>({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
});

const Staff = model("Staff", staffSchema);
export type { IStaff };
export { Staff, validateStaff };