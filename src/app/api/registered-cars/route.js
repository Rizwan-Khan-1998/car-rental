import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { Car } from "@/lib/modals/car";
export async function POST(request) {
  const body = await request.json();
  await connect();
  const newCar = new Car(body);
  await newCar.save();

  // Return the response with a JSON message
  return new NextResponse(JSON.stringify({ message: "new car is added" }), {
    status: 200,
  });
}
export async function GET() {
  await connect();
  const cars = await Car.find({});
  return new NextResponse(JSON.stringify(cars), { status: 200 });
}
