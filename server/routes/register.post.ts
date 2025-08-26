import { z } from "zod";
import { DEFAULT_PROFILE_PICTURE, JWT_EXPIRES_IN } from "~/contants/config";
import { get } from "~/utils/get";
import { createAccessToken, createRefreshToken } from "~/utils/tokens";
import { UserHelper } from "~/utils/user-utils";
import { userRolesMap } from "~~/schema/user";

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
    const existing = await UserHelper.from(body.email);

    if (existing) {
        throw createError({
            statusCode: 409,
            message: `Email ${body.email} already used. Please use another email`,
            statusMessage: "Email Conflict",
        });
    }

    // Save the profile
    const profileFileName = !_pfpData
        ? DEFAULT_PROFILE_PICTURE
        : await uploadPFP(_pfpData);

    // Create new user
    const userH = await UserHelper.create({
        email: body.email,
        password: body.password,
        roles: [body.type],
        profilePicture: profileFileName,
        metadata: body.metadata,
    });

    const user = userH.user;

    // Generate tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return {
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRES_IN,
        user: userH.toJson({ preference: true, dates: true }),
    };
});
