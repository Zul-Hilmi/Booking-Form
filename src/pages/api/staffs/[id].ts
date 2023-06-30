import type { APIRoute } from "astro";
import { getUser } from "../../../lib/auth";
import { Staff } from "../../../models/Staff";

export const del: APIRoute = async (ctx) => {
    console.log('ho')
    try {
        const token = await getUser(ctx.request.headers.get("Auth")?.split(' ')[1]);
        await Staff.deleteOne({ _id: ctx.params.id }).orFail();
        return new Response(JSON.stringify({ message: "Anggota berjaya dipadam" }), { status: 200 });
    } catch (err) {
        console.log(err);
    }
    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}