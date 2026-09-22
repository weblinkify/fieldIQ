import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");
    const limit = parseInt(searchParams.get("limit") || "100");

    const measurements = await prisma.sensorMeasurement.findMany({
      where: deviceId ? { deviceId } : undefined,
      orderBy: { timestamp: "desc" },
      take: limit,
    });
    return NextResponse.json({ success: true, data: measurements, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch measurements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const measurement = await prisma.sensorMeasurement.create({
      data: {
        deviceId: body.deviceId,
        sensorType: body.sensorType,
        value: body.value,
        unit: body.unit,
        status: body.status,
      },
    });
    return NextResponse.json({ success: true, data: measurement, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to record measurement" }, { status: 500 });
  }
}
