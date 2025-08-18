import { hash } from "argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
    ARGON_MEMORYCOST,
    ARGON_PARALLELISM,
    ARGON_TIMECOST,
    JWT_EXPIRES_IN,
} from "~/contants/config";
import { get } from "~/utils/get";
import { execBasedUserType } from "~/utils/getUser";
import { createAccessToken, createRefreshToken } from "~/utils/tokens";
import { validateBody } from "~/utils/validateBody";
import { db } from "~~/db";
import { companies } from "~~/schema/company";
import { providers } from "~~/schema/provider";
import { recipients } from "~~/schema/recipient";
import { User, userRolesMap, users } from "~~/schema/user";

// # MetaData Validation

const recipientMetadata = z.object({
    firstname: z.string({ required_error: "Firstname is required!" }),
    lastname: z.string({ required_error: "Lastname is required!" }),
});

const providerMetadata = z.object({
    firstname: z.string({ required_error: "Firstname is required!" }),
    lastname: z.string({ required_error: "Lastname is required!" }),
});

const companyMetadata = z.object({
    name: z.string({ required_error: "Company name is required!" }),
});

// # Request Body Validation

const bodySchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
    password: z
        .string({ required_error: "Password is required" })
        .regex(/.*[A-Z]/, "Password must have at least 1 uppercase letter")
        .regex(/.*[a-z]/, "Password must have at least 1 lowercase letter")
        .regex(
            /.*[\!\@\$\.]/,
            "Password must contain at least 1 symbol (!, @, $, .)"
        )
        .min(8, "Password must be at least 8 characters long")
        .max(500, "Password can't exceed 500 characters"),
    type: z.enum(userRolesMap, {
        message: "DevError: Invalid user type",
        required_error: "DevError: No usertype passed on user creation",
    }),
    metadata: z.union([recipientMetadata, providerMetadata, companyMetadata], {
        message: "Invalid Metadata type",
        required_error: "Metadata is required",
    }),
});

// # Route Handler

export default defineEventHandler(async (event) => {
    const _body = await readMultipartFormData(event);
    const _email = arrayBufferToString(get(_body, "email")?.data);
    const _password = arrayBufferToString(get(_body, "password")?.data);
    const _type = arrayBufferToString(get(_body, "type")?.data);
    const _pfpData = get(_body, "profilePicture");

    const [_metadata, _] = safeTry(() =>
        JSON.parse(arrayBufferToString(get(_body, "metadata")?.data) ?? "{}")
    );

    const { data: body, error: _argError } = await bodySchema.safeParse({
        email: _email,
        password: _password,
        type: _type,
        metadata: _metadata,
    });

    if (_argError) {
        console.log(
            "From validating form data",
            _argError.issues,
            _body?.map((el) => ({ ...el, data: arrayBufferToString(el.data) }))
        );
        throw createError({
            status: 400,
            message: _argError.issues[0].message,
        });
    }

    // Check if email is already used
    const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

    if (existing) {
        throw createError({
            statusCode: 409,
            message: `Email ${body.email} already used. Please use another email`,
            statusMessage: "Email Conflict",
        });
    }

    // Hash the password
    const hashedpassword = await hash(body.password, {
        memoryCost: ARGON_MEMORYCOST,
        timeCost: ARGON_TIMECOST,
        parallelism: ARGON_PARALLELISM,
    });

    // Save the profile
    const profileFileName = await uploadPFP(_pfpData!);

    // Create new user
    const [user] = await db
        .insert(users)
        .values({
            email: body.email,
            password: hashedpassword,
            roles: [body.type],
            profilePicture: profileFileName,
        })
        .returning();

    // Create subuser
    const [sub, error] = await safeAwait(
        execBasedUserType(user, {
            ROLE_PROVIDER: createProvider.bind(null, body),
            ROLE_RECIPIENT: createRecipient.bind(null, body),
            ROLE_COMPANY: createCompany.bind(null, body),
        })
    );

    if (error) {
        throw createError({
            statusCode: 500,
            message: error.message,
        });
    }

    // Generate tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            roles: user.roles,
            profile: user.profilePicture,
        },
        sub,
        expiresIn: JWT_EXPIRES_IN,
    };
});

// ------------------------
//        SubUser Creation
// ------------------------
type RequestBody = z.infer<typeof bodySchema>;

const createProvider = async (body: RequestBody, user: User) => {
    const metadata = body.metadata as z.infer<typeof providerMetadata>;

    const [provider] = await db
        .insert(providers)
        .values({ ...metadata, userId: user.id })
        .returning();

    return provider;
};

const createRecipient = async (body: RequestBody, user: User) => {
    const metadata = body.metadata as z.infer<typeof recipientMetadata>;

    const [recipient] = await db
        .insert(recipients)
        .values({ ...metadata, userId: user.id })
        .returning();

    return recipient;
};

const createCompany = async (body: RequestBody, user: User) => {
    const metadata = (body.metadata || {}) as z.infer<typeof companyMetadata>;

    const [company] = await db
        .insert(companies)
        .values({ ...metadata, userId: user.id })
        .returning();

    return company;
};
