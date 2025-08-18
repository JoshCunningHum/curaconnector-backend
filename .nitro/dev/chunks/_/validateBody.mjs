import { readValidatedBody, createError, getValidatedQuery } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';

const validateBody = async (event, schema) => {
  const { data, error } = await readValidatedBody(event, schema.safeParse);
  if (error) {
    console.log("From validate body:", error);
    throw createError({
      status: 400,
      message: error.issues[0].message
    });
  }
  return data;
};
const validateQuery = async (event, schema) => {
  const { error, data } = await getValidatedQuery(event, schema.safeParse);
  if (error) {
    console.log("From validate body:", error);
    throw createError({
      status: 400,
      message: error.issues[0].message
    });
  }
  return data;
};

export { validateQuery as a, validateBody as v };
//# sourceMappingURL=validateBody.mjs.map
