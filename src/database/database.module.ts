import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Env } from "src/env";
import { Users } from "./entities/users.entity";
import { Genre } from "./entities/genre.entity";
import { Movies } from "./entities/movies.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<Env, true>) => ({
        type: 'postgres',
        host: config.getOrThrow('POSTGRE_HOST'),
        port: config.getOrThrow('POSTGRE_PORT'),
        database: config.getOrThrow('POSTGRE_DATABASE'),
        username: config.getOrThrow('POSTGRE_USERNAME'),
        password: config.getOrThrow('POSTGRE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: config.getOrThrow('POSTGRE_SYNCHRONIZE'),
        entities: [Users, Genre, Movies]
      }),
      inject: [ConfigService],
  }), TypeOrmModule.forFeature([Users, Genre, Movies]) ],
})
export class DatabaseModule {}