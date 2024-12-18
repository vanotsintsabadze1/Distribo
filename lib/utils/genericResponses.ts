"use server";

export async function Ok(data: any = null, message: string = "Success"): Promise<ActionResult> {
  return { status: 200, message, data };
}

export async function Problem(status: number, message: string, data = null): Promise<ActionResult> {
  return { status, message, data: null };
}

export async function InternalError(data = null): Promise<ActionResult> {
  return { status: 500, message: "Internal Server Error", data: null };
}
