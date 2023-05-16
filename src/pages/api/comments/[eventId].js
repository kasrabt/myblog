import { MongoClient } from "mongodb";

const handler =async (req, res) => {
    const eventId  = req.query.eventId;
    const client = await MongoClient.connect('mongodb+srv://kasra:bTYIAu7s2eXOWGtU@cluster0.2fhq0jy.mongodb.net/events?retryWrites=true&w=majority')
  if (req.method === "POST") {
    const { email, text, name } = req.body;
    if (!email.includes("@") || !text || !name) {
      res.status(422).json({ message: "invalid data" });
      return;
    }
    const DataofCm = {
      eventId , 
        email , 
        name , 
        text ,
    }
    const db = client.db();
    const result = await db.collection('comments').insertOne(DataofCm)
    console.log(result)
    res.status(201).json({message :' submited Your Cm' , comment : DataofCm})
  }
  if(req.method === 'GET'){
     const db = client.db(); 
     const resUlt  =await db.collection('comments').find().sort({ _id : -1}).toArray()
     res.status(200).json({ message : 'ok' , comments : resUlt })
  }
  client.close();
};

export default handler;
