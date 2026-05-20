import { Request, Response } from "express";
import { z } from "zod";

class UploadsController {
  async create(req: Request, res: Response) {
    const paramsSchema = z.object({});
    res.json({ message: "ok" });
  }
}

export { UploadsController };
