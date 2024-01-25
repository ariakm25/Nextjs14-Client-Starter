import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { database } from './index';
import { join } from 'path';

migrate(database, {
  migrationsFolder: join(__dirname, 'migrations'),
})
  .then(() => {
    console.log('Migration completed');
  })
  .catch((error) => {
    console.error('Migration failed', error);
  })
  .finally(() => {
    process.exit(0);
  });
