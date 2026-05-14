import { Request, Response } from "express";

class RefundsController {
  async create(req: Request, res: Response) {
    res.json({ message: "ok" });
  }
}

export { RefundsController };
