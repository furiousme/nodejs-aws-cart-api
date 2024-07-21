export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
      DB_HOST: process.env.DATABASE_HOST || "",
      DB_PORT: process.env.DATABASE_PORT || "5432",
      DB_USER: process.env.DB_USER || "",
      DB_PASSWORD: process.env.DB_PASSWORD || ""
    }
});