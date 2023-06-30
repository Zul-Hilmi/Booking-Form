import { connect } from 'mongoose';

let connected = false;

async function connectToDb() {
    try {
        await connect(import.meta.env.DB_STRING);
        console.log("connected to database")
        connected = true;
    } catch (err) {
        console.log(err)
    }

}

if (connected === false) await connectToDb().catch(_ => process.exit(1));
