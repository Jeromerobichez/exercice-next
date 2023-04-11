import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"
import { log } from "console";


export default async function handler(req, res) {
    const idMovie = req.query.idMovie;

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    console.log("idddddd", idMovie);
    if (idMovie !== null) {

  console/log("pas null")
    const comments = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).limit(20).toArray();
    res.json({ status: 200, data: comments });
} else {
    console.log("nuuuuuull")
    const comments = await db.collection("comments").find({}).limit(20).toArray();
    res.json({ status: 200, data: comments });
}
}
