import type { APIRoute } from "astro";
import { getUser } from "../../../lib/auth";
import { Staff, validateStaff } from "../../../models/Staff";

export const get: APIRoute = async (ctx) => {
    try {
        let staffs = await Staff.find();
        if (staffs === null) staffs = []
        return new Response(JSON.stringify({ staffs: staffs }), { status: 200 });
    } catch (err) {
        console.log(err)
    }
    return new Response(
        JSON.stringify({ message: "server mengalalmi masalah" }),
        { status: 500 }
    );
}

export const post: APIRoute = async (ctx) => {
    try {
        const token = await getUser(ctx.request.headers.get('Auth')?.split(' ')[1]);
        if (!token) return new Response(JSON.stringify({ message: "sila log masuk" }), { status: 403 });

        const formData = await ctx.request.formData();

        const valid = validateStaff.required().strip().safeParse(Object.fromEntries(formData));

        if (!valid.success) {
            return new Response(JSON.stringify({ message: "maklumat tidak sah" }), { status: 403 });
        }

        const staff = new Staff(valid.data);

        let emailExist = false;

        await staff.save().catch(err => {
            if (err.code === 11000) emailExist = true;
            else throw new Error(err);
        });

        return emailExist
            ? new Response(JSON.stringify({ message: "Email pernah digunakan" }), { status: 403 })
            : new Response(JSON.stringify({ message: "anggota berjaya didaftar" }), { status: 200 })


    } catch (err) {
        console.log(err);
    }

    return new Response(
        JSON.stringify({ message: "server mengalalmi masalah" }),
        { status: 500 }
    );
}