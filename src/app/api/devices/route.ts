import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");

    const devices = await prisma.device.findMany({
      where: siteId ? { siteId } : undefined,
      include: {
        site: true,
      },
      orderBy: { lastSeen: "desc" },
    });
    return NextResponse.json({ success: true, data: devices, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch devices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const device = await prisma.device.create({
      data: {
        name: body.name,
        siteId: body.siteId,
        status: body.status || "offline",
        batteryLevel: body.batteryLevel || 100,
        firmwareVersion: body.firmwareVersion || "1.0.0",
      },
    });
    return NextResponse.json({ success: true, data: device, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create device" }, { status: 500 });
  }
}
