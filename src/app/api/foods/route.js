import clientPromise from "@/lib/dbConnect";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("foodDB");

  const foods = await db.collection("foods").find().toArray();

  return Response.json(foods);
}

