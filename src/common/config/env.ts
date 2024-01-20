interface IEnv {
  public: {
    appName?: string;
    appUrl?: string;
  };
  apiUrl?: string;
}

export const getEnv: IEnv = {
  public: {
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  },
  apiUrl: process.env.API_URL,
};
