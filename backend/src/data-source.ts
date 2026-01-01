import { DataSource } from 'typeorm';

declare global {
    // allow caching the DataSource across serverless invocations
    var __appDataSource: DataSource | undefined;
}

const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? 3306);
const username = process.env.DB_USER ?? process.env.DB_USERNAME ?? 'root';
const password = process.env.DB_PASSWORD ?? '';
const database = process.env.DB_NAME ?? 'ourorder';

if (!global.__appDataSource) {
    global.__appDataSource = new DataSource({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        synchronize: false,
        logging: true,
    });
}

export const AppDataSource = global.__appDataSource!;
