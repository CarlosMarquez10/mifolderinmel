import  dotenv  from "dotenv";

dotenv.config();

export const Port = process.env.PORT || 3011;
export const host = process.env.DB_HOST || 'localhost';
export const User = process.env.DB_USER || 'mifolderinmel';
export const Password = process.env.DB_PASSWORD || 'mifolder.2024';
export const nameDatabase = process.env.DB_NAME || 'mifolder';
export const da_port = process.env.DB_PORT || 3306;