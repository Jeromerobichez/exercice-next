import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"
import { log } from "console";

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get a comment by ID.
 *     parameters:
 *       - in: query
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to get.
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Create a new comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               text:
 *                 type: string
 *               email:
 *                 type: string
 *               movie_id:
 *                 type: string
 *         description: The comment to create.
 *     responses:
 *       200:
 *         description: OK
 *   put:
 *     summary: Update a comment by ID.
 *     parameters:
 *       - in: query
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               text:
 *                 type: string
 *               email:
 *                 type: string
 *               movie_id:
 *                 type: string
 *         description: The comment fields to update.
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a comment by ID.
 *     parameters:
 *       - in: query
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: OK
 */


export default async function handler(req, res) {
    const idComment = req.query.idComment

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let comments = {}
    switch (req.method) {
        case 'GET':
            comments = await db.collection("comments").findOne({ _id: new ObjectId(idComment) })
            if (comments !== null) {
                res.json({ status: 200, comments: comments })
            }
            else {
                res.json({ infos : "_id not in the DB" })
            }
            break;
        case 'POST':
            comments = await db.collection("comments").insertOne({ ...req.body });
            res.json({ status: 200, comments: comments });
            break;
        case 'PUT':
            comments = await db.collection("comments").findOneAndUpdate(
                { _id: new ObjectId(idComment) },
                { $set: { ...req.body } },)
            res.json({ status: 200, statut: 'put', comments: comments })
            break;
        case 'DELETE':
            comments = await db.collection("comments").findOneAndDelete(
                { _id: new ObjectId(idComment) })
            res.json({ status: 200, comments: comments });
            break;

        default:
            comments = await db.collection("comments").findOne({ _id: new ObjectId(idComment) })
            res.json({ status: 200, data: req.body, comments: comments })
    }
}

