import type { APIRoute } from "astro";
import type { HydratedDocument } from "mongoose";
import { getUser } from "../../../lib/auth";
import { type IForm, Form } from "../../../models/Form";
import Excel from 'exceljs';

export const get: APIRoute = async (ctx) => {
    try {
        const token = await getUser(ctx.request.headers.get('Auth')?.split(' ')[1]);
        if (!token) return new Response(JSON.stringify({ message: 'sila log masuk' }), { status: 403 });
        const form = await Form.findById(ctx.params.id);
        return new Response(JSON.stringify({ form }), { status: 200 });
    } catch (err) {
        console.log(err);
    }
    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}

export const post: APIRoute = async (ctx) => {
    try {
        const token = await getUser(ctx.request.headers.get('Auth')?.split(' ')[1]);
        if (!token) return new Response(JSON.stringify({ message: 'sila log masuk' }), { status: 403 });
        const form = await Form.findById(ctx.params.id).select({ _id: false, __v: false }).lean();
        if (!form) return new Response(JSON.stringify({ message: "Borang tidak wujud" }), { status: 404 });
        const fileUrl = `${ctx.url.protocol}//${ctx.url.host}/Borang.xlsx`;
        const file = await fetch(fileUrl);
        const data = await file.arrayBuffer();
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(data);
        const sheet1 = workbook.getWorksheet(1);
        const sheet2 = workbook.getWorksheet(2);
        const items = Object.entries(form);
        for (let [key, value] of items) {
            let assertType = (typeof value === "number") ? Number(value) : value.toString();
            if (key == "Jenis") {
                key = assertType.toString();
                assertType = "/";
            }
            sheet1.getCell(key).value = assertType;
        }


        const buffer = await workbook.xlsx.writeBuffer();
        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Disposition': 'inline; filename=excel_file.',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });
    } catch (err) {
        console.log(err)
    }
    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}

export const del: APIRoute = async (ctx) => {

    try {
        const token = await getUser(ctx.request.headers.get('Auth')?.split(' ')[1]);
        if (!token) return new Response(JSON.stringify({ message: "sila log masuk" }), { status: 403 });
        await Form.deleteOne({ _id: ctx.params.id });
        return new Response(JSON.stringify({ message: "borang berjaya dipadam" }), { status: 200 });
    } catch (err) {
        console.log(err);
    }

    return new Response(JSON.stringify({ message: "server mengalami masalah" }), { status: 500 });
}