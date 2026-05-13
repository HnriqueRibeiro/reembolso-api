import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("E-mail ou password inválidos", 401);
    }

    const PasswordMatched = await compare(password, user.password);

    if (!PasswordMatched) {
      throw new AppError("E-mail ou password inválidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
