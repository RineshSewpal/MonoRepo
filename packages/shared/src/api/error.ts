// packages/shared/src/api/error.ts

export interface ApiError {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
}

export type ApiErrorCode =
    | "VALIDATION_ERROR"
    | "NOT_FOUND"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "CONFLICT"
    | "INTERNAL_ERROR";
