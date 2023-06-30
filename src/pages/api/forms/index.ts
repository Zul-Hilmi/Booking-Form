import type { APIRoute } from "astro";
import { getUser } from "../../../lib/auth";
import { Form, IForm, validateForm } from "../../../models/Form";
import type { HydratedDocument } from "mongoose";

export const get: APIRoute = async (ctx) => {
    try {
        const token = await getUser(ctx.request.headers.get('Auth')?.split(' ')[1]);
        if (!token) return new Response(JSON.stringify({ message: 'sila log masuk' }), { status: 403 });
        const forms: HydratedDocument<IForm>[] = await Form.find() ?? [];
        return new Response(JSON.stringify({ forms }), { status: 200 });
    } catch (err) {
        console.log(err);
    }
    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}

export const post: APIRoute = async (ctx) => {
    try {
        const formData = await ctx.request.json();
        const validate = validateForm.partial().safeParse(formData)
        if (validate.success === true) {
            await new Form(validate.data).save();
            return new Response(JSON.stringify({
                message: "Borang berjaya dihantar"
            }), { status: 200 });
        } else {
            console.log(validate.error.errors)
        }

    } catch (err) {
        console.log(err)
    }
    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}