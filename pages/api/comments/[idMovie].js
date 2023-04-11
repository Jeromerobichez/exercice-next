import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"
import { log } from "console";

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get a list of comments for a movie.
 *     parameters:
 *       - in: query
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to get comments for.
 *     responses:
 *       200:
 *         description: OK
 */


export default async function handler(req, res) {
    const idMovie = req.query.idMovie;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const comments = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).limit(20).toArray();
    res.json({ status: 200, data: comments });

}
