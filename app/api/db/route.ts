import { NextResponse } from "next/server";
import clientPromise from "../../../libs/mongodb";

//test de recup de data dans mon atlas mongodb

export async function GET(req: Request) {
  const client = await clientPromise;
//   const db = client.db("history_vocal-chat");
  const db = client.db("DrivingApp");
    const data = await db.collection("comments").find({}).toArray();
    return NextResponse.json({ data: data }, { status: 500 })
  }
