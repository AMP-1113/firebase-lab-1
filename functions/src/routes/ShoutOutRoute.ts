import * as functions from "firebase-functions";
import express from "express";
import { getClient } from "../db";
import cors from "cors";
import ShoutOut from "../model/ShoutOut";
import { ObjectId } from "mongodb";


const app = express();
app.use(cors());
app.use(express.json());

app.get( "/hello", (req, res) => {
    res.json({ message: "Hello World" });
});

// 1. GET /shoutouts
app.get("/", async (req, res) => {
  const to = req.query.to as string;
  
  const mongoQuery: any = {};
  // if a year was specified, add it to the mongo query
  if (to) {
    mongoQuery.to = to; // { name: ""  }
  } 

    try {
      const client = await getClient();
      const results = await client.db().collection<ShoutOut>('shoutOuts').find(mongoQuery).toArray();
      res.json(results); // send JSON results
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });



  // 2. POST /shoutouts
app.post("/", async (req, res) => {
    const shoutout = req.body as ShoutOut;
    try {
      const client = await getClient();
      const result = await client.db().collection<ShoutOut>('shoutOuts').insertOne(shoutout);
      shoutout._id = result.insertedId;
      res.status(201).json(shoutout);
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

  // EXT. Challenge

    // GET //top_names
    app.get("/top_names", async (req, res) => {
      try {
        const client = await getClient();
        const results = await (await client.db().collection<ShoutOut>('shoutOuts').aggregate([
          {$group: {
            _id: "$to",
            total: {$sum: 1}
          }},
          {$project: {
            Name: "$_id",
            _id: false,
            Shout_Outs: "$total",
          }},
          {$sort: { Shout_Outs: -1}},
          {$limit: 5}
        ]).toArray());
        res.json(results); // send JSON results
      } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      }
    });

    // GET /shoutouts?to=
    app.get("/:to", async (req, res) => {
      const to = req.params.to;
      try {
        const client = await getClient();
        const shoutout = await client.db().collection<ShoutOut>('shoutOuts').find({ to : to });
        if (shoutout) {
          res.json(shoutout);
        } else {
          res.status(404).json({message: "Not Found"});
        }
      } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      }
    });

  // DELETE /shoutouts:id
  app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<ShoutOut>('shoutOuts').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({message: "Not Found"});
      } else {
        res.status(204).end();
      }
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });


export default functions.https.onRequest(app);