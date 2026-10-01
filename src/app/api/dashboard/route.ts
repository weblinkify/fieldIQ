import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/simulator";
import type { ApiResponse, DashboardData } from "@/lib/types";

export async function GET() {
  try {
    const data = getDashboardData();

    const response: ApiResponse<DashboardData> = {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
