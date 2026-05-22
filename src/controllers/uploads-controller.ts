import { Request, Response } from "express";
import z, { ZodError } from "zod";
import { DiskStorage } from "@/providers/disk-storage";
import uploadConfig from "@/configs/upload";
import { AppError } from "@/utils/AppError";

class UploadsController {
  async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage();
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, { message: "Arquivo é obrigatório." }),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              {
                message:
                  "Formato de arquivo inválido. Formatos permitidos: " +
                  uploadConfig.ACCEPTED_IMAGE_TYPES,
              },
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `Arrquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE}`,
            ),
        })
        .passthrough();

      const file = fileSchema.parse(req.file);

      const filename = await diskStorage.saveFile(file.filename);

      res.json(filename);
    } catch (error) {
      if (error instanceof ZodError) {
        if (req.file) {
          await diskStorage.deletefile(req.file.filename, "tmp");
        }

        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }
}

export { UploadsController };
