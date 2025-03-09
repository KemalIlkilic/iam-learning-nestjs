import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions, QueryRunner } from 'typeorm';
import { neon } from '@neondatabase/serverless';
import { Song } from 'src/songs/song.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL') || '',
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        entities: [Song],
        extra: {
          max: 5, // Neon supports max 5 connections
        },
        // Add the custom data source factory to use Neon serverless
        dataSourceFactory: async (options: DataSourceOptions) => {
          // Handle the undefined case with a default empty string or throw an error
          const dbUrl = configService.get<string>('DATABASE_URL');
          if (!dbUrl) {
            throw new Error('DATABASE_URL is not defined');
          }

          const sql = neon(dbUrl);

          // Create a standard dataSource
          const dataSource = new DataSource(options);

          // Save the original query method
          const originalQuery = dataSource.query.bind(dataSource);

          // Override the query method with proper types
          dataSource.query = async function <T = any>(
            query: string,
            parameters?: any[],
            queryRunner?: QueryRunner,
          ): Promise<T> {
            try {
              if (parameters && parameters.length > 0) {
                // Need to cast the return type to T
                return (await sql(query, parameters)) as unknown as T;
              } else {
                return (await sql(query)) as unknown as T;
              }
            } catch (error) {
              Logger.error(
                `Query execution error: ${error.message}`,
                'DatabaseModule',
              );
              throw error;
            }
          };

          return dataSource;
        },
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      Logger.log(
        '✅ Successfully connected to the database!',
        'DatabaseModule',
      );
    } else {
      Logger.error('❌ Database connection failed!', 'DatabaseModule');
    }
  }
}
