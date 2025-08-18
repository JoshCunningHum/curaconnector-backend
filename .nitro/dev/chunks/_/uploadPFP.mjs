import { createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function generateRandomFilename(extension) {
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now();
  return `${timestamp}-${randomPart}.${extension}`;
}

const uploadPFP = async ({
  data,
  filename
}) => {
  var _a;
  const extension = (_a = filename == null ? void 0 : filename.split(".").pop()) != null ? _a : "jpg";
  const newFilename = generateRandomFilename(extension);
  const pfpDir = resolve(process.cwd(), "server/public/images/pfps");
  try {
    await mkdir(pfpDir, { recursive: true });
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: "Please try again"
    });
  }
  await writeFile(resolve(pfpDir, newFilename), data);
  return newFilename;
};

export { uploadPFP as u };
//# sourceMappingURL=uploadPFP.mjs.map
