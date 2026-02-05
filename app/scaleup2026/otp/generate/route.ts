import { NextRequest } from "next/server";
import { handleOtpGenerateProxy } from "@/lib/scaleupProxy";

export const runtime = "nodejs";

export const POST = async (request: NextRequest) => {
  return handleOtpGenerateProxy(request);
};
