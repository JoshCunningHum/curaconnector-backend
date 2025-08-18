import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "path";

export const uploadPFP = async ({
    data,
    filename,
}: {
    filename?: string;
    data: Buffer<ArrayBufferLike>;
}): Promise<string> => {
    const extension = filename?.split(".").pop() ?? "jpg";
    const newFilename = generateRandomFilename(extension);
    const pfpDir = resolve(process.cwd(), "server/public/images/pfps");

    // Ensure DIR exists
    try {
        await mkdir(pfpDir, { recursive: true });
    } catch (e) {
        // Ignore if directory already exists
        throw createError({
            statusCode: 500,
            message: "Please try again",
        });
    }

    await writeFile(resolve(pfpDir, newFilename), data);

    return newFilename;
};
