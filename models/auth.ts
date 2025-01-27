export interface LoginPayload {
    username: string;
    password: string
}

export interface UserProfile {
    username: string,
    password: string,
    email?: string
}