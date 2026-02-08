import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";

const execAsync = promisify(exec);

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),

  gitPull: adminProcedure.mutation(async () => {
    try {
      const { stdout, stderr } = await execAsync("git pull");
      return {
        success: true,
        output: stdout,
        error: stderr,
      };
    } catch (error: any) {
      return {
        success: false,
        output: error.stdout || "",
        error: error.stderr || error.message,
      };
    }
  }),
});
