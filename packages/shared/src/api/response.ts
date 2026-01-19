// packages/shared/src/api/response.ts
import type { ApiError } from "./error";

export type ApiResponse<T> =
    | { ok: true; data: T }
    | { ok: false; error: ApiError };
