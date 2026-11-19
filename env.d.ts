declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    MONGODB_URI: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}
