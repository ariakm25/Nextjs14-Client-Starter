import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { getEnv } from '@/common/config/env';

const { database: dbConfig } = getEnv;

const buildPgConnStr = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
const postgresClient = postgres(buildPgConnStr);

export const database: PostgresJsDatabase = drizzle(postgresClient);
