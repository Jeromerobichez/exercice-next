import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb"
import { log } from "console";

/**
 * @swagger
 * /api/movies/{id}:
 *   post:
 *     summary: Create a new movie.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID.
 *       - in: body
 *         name: movie
 *         required: true
 *         schema:
 *           type: object
 *         description: The movie data.
 *     responses:
 *       200:
 *         description: OK
 *   get:
 *     summary: Get a movie by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID.
 *     responses:
 *       200:
 *         description: OK
 *   put:
 *     summary: Update a movie by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID.
 *       - in: body
 *         name: movie
 *         required: true
 *         schema:
 *           type: object
 *         description: The updated movie data.
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a movie by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID.
 *     responses:
 *       200:
 *         description: OK
 */

export default async function handler(req, res) {
    const idMovie = req.query.id

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    let dbMovie = {};
    switch (req.method) {
    case 'POST' :
       dbMovie = await db.collection("movies").insertOne({...req.body});  
        console.log("req.body", req.body)
        res.json({ status: 200, data: {movie: dbMovie} });
        break;
    case 'GET' :  dbMovie = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
    res.json({ status: 200, data: {movie: dbMovie} });
    console.log("query",req.query)
    console.log("body :",req.body)
    break;
    case 'PUT' :  dbMovie = await db.collection("movies").findOneAndUpdate(
       { _id : new ObjectId(idMovie) },
       {  $set : {...req.body}},
        );
    break;
    case 'DELETE' : dbMovie = await db.collection("movies").findOneAndDelete(
        { _id : new ObjectId(idMovie) });
    break;
    default : console.log('error in definition of the HTTP method')
    }
    
}
