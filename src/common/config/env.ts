interface IEnv {
  public: {
    appName?: string;
    appUrl?: string;
  };
  apiUrl?: string;
  database: {
    host?: string;
    port?: number;
    name?: string;
    user?: string;
    password?: string;
  };
}

export const getEnv: IEnv = {
  public: {
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  },
  apiUrl: process.env.API_URL,
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
};
