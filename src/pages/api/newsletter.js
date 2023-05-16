
import { MongoClient } from "mongodb";

const handler =async(req, res)=> {
  if (req.method === "POST") {
    const userEmailAddres = req.body.email;
    if (!userEmailAddres || !userEmailAddres.includes("@")) {
      res.status(422).json({ message: " invalid Email Addres" });
      return;
    }
    console.log(userEmailAddres)
    const client = await MongoClient.connect('mongodb+srv://kasra:bTYIAu7s2eXOWGtU@cluster0.2fhq0jy.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db('newsletter'); 
    await db.collection('emails').insertOne({email : userEmailAddres})
    client.close();
    res.status(201).json({ message: "signed up!" });
  }
};

export default handler;
