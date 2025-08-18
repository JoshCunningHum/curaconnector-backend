// @ts-nocheck

import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import argon2 from "argon2";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

const app = express();

// Types
interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserPayload {
    id: number;
    username: string;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

// Security middleware
app.use(helmet()); // Security headers
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json({ limit: "10mb" }));

// Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // limit each IP to 5 requests per windowMs
    message: {
        error: "Too many authentication attempts",
        message: "Please try again later",
        retryAfter: 15 * 60, // seconds
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// General rate limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests",
        message: "Please try again later",
    },
});

app.use(generalLimiter);

// Environment variables (use dotenv in production)
const JWT_SECRET =
    process.env.JWT_SECRET ||
    (() => {
        console.warn(
            "⚠️  JWT_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
        );
        return "your-super-secret-jwt-key";
    })();

const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET ||
    (() => {
        console.warn(
            "⚠️  JWT_REFRESH_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
        );
        return "your-refresh-secret-key";
    })();

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// Mock user database (use real database in production)
const users: User[] = [];

// Initialize with a test user (you can remove this in production)
const initializeTestUser = async () => {
    const hashedPassword = await argon2.hash("password123");
    users.push({
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
    });
};

// Initialize test user
initializeTestUser().catch(console.error);

// Store refresh tokens (use Redis or database in production)
const refreshTokens = new Set<string>();

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation function
const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
        errors.push("Password must contain at least one special character (@$!%*?&)");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Utility functions
const generateAccessToken = (user: User): string => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            issuer: "your-app-name",
            audience: "your-app-users",
        }
    );
};

const generateRefreshToken = (user: User): string => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            type: "refresh",
        },
        JWT_REFRESH_SECRET,
        {
            expiresIn: JWT_REFRESH_EXPIRES_IN,
            issuer: "your-app-name",
            audience: "your-app-users",
        }
    );
};

// Middleware to verify JWT token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({
            error: "Access token required",
            message: "Please provide a valid access token in the Authorization header",
        });
        return;
    }

    jwt.verify(
        token,
        JWT_SECRET,
        {
            issuer: "your-app-name",
            audience: "your-app-users",
        },
        (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({
                        error: "Token expired",
                        message: "Access token has expired, please refresh",
                        code: "TOKEN_EXPIRED",
                    });
                    return;
                }
                res.status(403).json({
                    error: "Invalid token",
                    message: "The provided token is invalid",
                    code: "INVALID_TOKEN",
                });
                return;
            }

            const payload = decoded as JwtPayload & UserPayload;
            req.user = {
                id: payload.id,
                username: payload.username,
                email: payload.email,
            };
            next();
        }
    );
};

// Routes

// POST /register - Register a new user
app.post(
    "/register",
    authLimiter,
    async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<void> => {
        const { username, email, password, confirmPassword } = req.body;

        // Validate input
        if (!username || !email || !password) {
            res.status(400).json({
                error: "Missing required fields",
                message: "Username, email, and password are required",
                fields: {
                    username: !username ? "Username is required" : undefined,
                    email: !email ? "Email is required" : undefined,
                    password: !password ? "Password is required" : undefined,
                },
            });
            return;
        }

        // Basic input validation
        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            res.status(400).json({
                error: "Invalid input types",
                message: "Username, email, and password must be strings",
            });
            return;
        }

        // Validate password confirmation if provided
        if (confirmPassword && password !== confirmPassword) {
            res.status(400).json({
                error: "Password mismatch",
                message: "Password and confirm password do not match",
            });
            return;
        }

        // Validate email format
        if (!EMAIL_REGEX.test(email)) {
            res.status(400).json({
                error: "Invalid email format",
                message: "Please provide a valid email address",
            });
            return;
        }

        // Validate username (alphanumeric + underscore, 3-30 chars)
        if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
            res.status(400).json({
                error: "Invalid username format",
                message:
                    "Username must be 3-30 characters long and contain only letters, numbers, and underscores",
            });
            return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            res.status(400).json({
                error: "Weak password",
                message: "Password does not meet security requirements",
                details: passwordValidation.errors,
            });
            return;
        }

        try {
            // Check if user already exists
            const existingUser = users.find((u) => u.username === username || u.email === email);
            if (existingUser) {
                const conflictField = existingUser.username === username ? "username" : "email";
                res.status(409).json({
                    error: "User already exists",
                    message: `A user with this ${conflictField} already exists`,
                    code: "USER_EXISTS",
                    field: conflictField,
                });
                return;
            }

            // Hash password with Argon2
            const hashedPassword = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16, // 64 MB
                timeCost: 3,
                parallelism: 1,
            });

            // Create new user
            const newUser: User = {
                id: users.length + 1, // In production, use proper ID generation
                username,
                email,
                password: hashedPassword,
            };

            // Add user to database
            users.push(newUser);

            // Generate tokens for immediate login
            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            // Store refresh token
            refreshTokens.add(refreshToken);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                    },
                    expiresIn: JWT_EXPIRES_IN,
                },
            });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "An error occurred during registration",
                code: "INTERNAL_ERROR",
            });
        }
    }
);

// POST /login - Authenticate user and return tokens
app.post(
    "/login",
    authLimiter,
    async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            res.status(400).json({
                error: "Missing credentials",
                message: "Username and password are required",
                fields: {
                    username: !username ? "Username is required" : undefined,
                    password: !password ? "Password is required" : undefined,
                },
            });
            return;
        }

        // Basic input validation
        if (typeof username !== "string" || typeof password !== "string") {
            res.status(400).json({
                error: "Invalid input types",
                message: "Username and password must be strings",
            });
            return;
        }

        try {
            // Find user
            const user = users.find((u) => u.username === username || u.email === username);
            if (!user) {
                res.status(401).json({
                    error: "Invalid credentials",
                    message: "Username or password is incorrect",
                    code: "INVALID_CREDENTIALS",
                });
                return;
            }

            // Verify password using Argon2
            const validPassword = await argon2.verify(user.password, password);
            if (!validPassword) {
                res.status(401).json({
                    error: "Invalid credentials",
                    message: "Username or password is incorrect",
                    code: "INVALID_CREDENTIALS",
                });
                return;
            }

            // Generate tokens
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            // Store refresh token
            refreshTokens.add(refreshToken);

            res.json({
                success: true,
                message: "Login successful",
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    },
                    expiresIn: JWT_EXPIRES_IN,
                },
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "An error occurred during login",
                code: "INTERNAL_ERROR",
            });
        }
    }
);

// POST /refresh-token - Refresh access token using refresh token
app.post(
    "/refresh-token",
    async (req: Request<{}, {}, RefreshTokenRequest>, res: Response): Promise<void> => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(401).json({
                error: "Refresh token required",
                message: "Please provide a refresh token",
                code: "MISSING_REFRESH_TOKEN",
            });
            return;
        }

        if (!refreshTokens.has(refreshToken)) {
            res.status(403).json({
                error: "Invalid refresh token",
                message: "The provided refresh token is invalid or has been revoked",
                code: "INVALID_REFRESH_TOKEN",
            });
            return;
        }

        try {
            const decoded = await new Promise<JwtPayload>((resolve, reject) => {
                jwt.verify(
                    refreshToken,
                    JWT_REFRESH_SECRET,
                    {
                        issuer: "your-app-name",
                        audience: "your-app-users",
                    },
                    (err, decoded) => {
                        if (err) reject(err);
                        else resolve(decoded as JwtPayload);
                    }
                );
            });

            // Verify token type
            if ((decoded as any).type !== "refresh") {
                refreshTokens.delete(refreshToken);
                res.status(403).json({
                    error: "Invalid token type",
                    message: "The provided token is not a refresh token",
                    code: "INVALID_TOKEN_TYPE",
                });
                return;
            }

            // Find user to get full details
            const fullUser = users.find((u) => u.id === (decoded as any).id);
            if (!fullUser) {
                refreshTokens.delete(refreshToken);
                res.status(403).json({
                    error: "User not found",
                    message: "The user associated with this token no longer exists",
                    code: "USER_NOT_FOUND",
                });
                return;
            }

            // Generate new access token
            const accessToken = generateAccessToken(fullUser);

            res.json({
                success: true,
                message: "Token refreshed successfully",
                data: {
                    accessToken,
                    expiresIn: JWT_EXPIRES_IN,
                },
            });
        } catch (error) {
            // Remove invalid refresh token
            refreshTokens.delete(refreshToken);

            if ((error as any).name === "TokenExpiredError") {
                res.status(401).json({
                    error: "Refresh token expired",
                    message: "The refresh token has expired, please log in again",
                    code: "REFRESH_TOKEN_EXPIRED",
                });
                return;
            }

            res.status(403).json({
                error: "Invalid refresh token",
                message: "The refresh token is invalid",
                code: "INVALID_REFRESH_TOKEN",
            });
        }
    }
);

// GET /protected - Protected route that requires valid JWT
app.get("/protected", authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
    res.json({
        success: true,
        message: "Welcome to the protected route!",
        data: {
            user: req.user,
            timestamp: new Date().toISOString(),
            serverTime: Date.now(),
        },
    });
});

// POST /logout - Logout user and invalidate refresh token
app.post("/logout", (req: Request<{}, {}, RefreshTokenRequest>, res: Response): void => {
    const { refreshToken } = req.body;

    if (refreshToken && refreshTokens.has(refreshToken)) {
        refreshTokens.delete(refreshToken);
    }

    res.json({
        success: true,
        message: "Logged out successfully",
        note: "Access token will remain valid until expiration. For complete security, implement token blacklisting.",
    });
});

// GET /me - Get current user info (protected route)
app.get("/me", authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
    res.json({
        success: true,
        data: {
            user: req.user,
        },
    });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response): void => {
    res.json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString(),
    });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: "An unexpected error occurred",
        code: "INTERNAL_ERROR",
    });
});

// 404 handler
app.use("*", (req: Request, res: Response): void => {
    res.status(404).json({
        error: "Not found",
        message: `Route ${req.method} ${req.originalUrl} not found`,
        code: "ROUTE_NOT_FOUND",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   POST /register - Register new user`);
    console.log(`   POST /login - Authenticate user`);
    console.log(`   POST /refresh-token - Refresh access token`);
    console.log(`   GET  /protected - Protected route`);
    console.log(`   GET  /me - Get current user`);
    console.log(`   POST /logout - Logout user`);
    console.log(`   GET  /health - Health check`);
});

export default app;

// Package.json dependencies example:
/*
{
  "name": "jwt-auth-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "argon2": "^0.40.3",
    "express-rate-limit": "^7.5.1",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.11.30",
    "typescript": "^5.4.3",
    "tsx": "^4.7.1"
  }
}
*/
