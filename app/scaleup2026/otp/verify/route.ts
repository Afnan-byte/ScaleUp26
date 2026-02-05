import { NextRequest } from "next/server";
import { handleOtpVerifyProxy } from "@/lib/scaleupProxy";

export const runtime = "nodejs";

export const POST = async (request: NextRequest) => {
  return handleOtpVerifyProxy(request);
};
