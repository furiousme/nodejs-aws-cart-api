export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
      DB_NAME: process.env.DB_NAME || "",
      DB_HOST: process.env.DB_HOST || "",
      DB_PORT: process.env.DB_PORT || "5432",
      DB_USER: process.env.DB_USER || "",
      DB_PASSWORD: process.env.DB_PASSWORD || ""
    }
});