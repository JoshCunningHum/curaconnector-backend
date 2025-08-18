import { createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';

const UserNotFoundError = () => {
  return createError({
    statusCode: 404,
    statusMessage: "User not found"
  });
};

export { UserNotFoundError as U };
//# sourceMappingURL=error.mjs.map
