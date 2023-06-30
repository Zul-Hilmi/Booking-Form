import type { APIRoute } from "astro";

export const get: APIRoute = (ctx) => {
    ctx.cookies.delete('token');
    return ctx.redirect('/');
}