import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sites = await prisma.site.findMany({
      include: {
        devices: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: sites, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch sites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const site = await prisma.site.create({
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
      },
    });
    return NextResponse.json({ success: true, data: site, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create site" }, { status: 500 });
  }
}
