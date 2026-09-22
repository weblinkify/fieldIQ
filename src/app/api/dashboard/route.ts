/**
 * FieldIQ — Dashboard API Route
 *
 * LEARNING CONCEPT: "API Route"
 * This file runs on the SERVER (your computer), not in the browser.
 * When the browser visits /api/dashboard, Next.js runs this function
 * and sends the result back as JSON data.
 *
 * It's like a waiter: the browser asks "what's the dashboard data?"
 * and this function goes to the kitchen (simulator), gets the data,
 * and brings it back.
 *
 * The GET function handles HTTP GET requests.
 * (GET = "give me data", POST = "save new data", etc.)
 */

import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/simulator";
import type { ApiResponse, DashboardData } from "@/lib/types";

export async function GET() {
  try {
    const data = await getDashboardData();

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
