import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb"
import { log } from "console";

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get a list of 20 comments.
 *     responses:
 *       200:
 *         description: OK
 */

export default async function handler(req, res) {


    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const comments = await db.collection("comments").find({}).limit(20).toArray();
    res.json({ status: 200, data: comments });
}
