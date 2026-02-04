import { NextRequest } from "next/server";
import { handleGenerateProxy } from "@/lib/scaleupProxy";

export const runtime = "nodejs";

export const POST = async (request: NextRequest) => {
  return handleGenerateProxy(request);
};
