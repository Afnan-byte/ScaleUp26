import { NextRequest } from "next/server";
import { handleUserProxy } from "@/lib/scaleupProxy";

export const runtime = "nodejs";

export const GET = async (request: NextRequest) => {
  return handleUserProxy(request);
};
