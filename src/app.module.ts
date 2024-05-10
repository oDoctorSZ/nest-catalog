import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersController } from "./controllers/users/create-user.controllers";
import { AuthenticateController } from "./controllers/auth/authenticate.controller";
import { CreateMoviesController } from "./controllers/movies/create-movie.controller";
import { ListMoviesController } from "./controllers/movies/list-movie.controller";
import { OrmUsersRepository } from "./repositories/orm/orm-users.repository";
import { OrmMoviesRepository } from "./repositories/orm/orm-movies.repository";
import { DeleteMoviesController } from "./controllers/movies/delete-movie.controller";
import { UpdateMoviesController } from "./controllers/movies/update-movie.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true
  }), 
  DatabaseModule,
  AuthModule
  ],
  controllers: [
    UsersController,
    AuthenticateController,
    CreateMoviesController,
    ListMoviesController,
    DeleteMoviesController,
    UpdateMoviesController,
  ],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: OrmUsersRepository
    },
    
    {
      provide: 'MoviesRepository',
      useClass: OrmMoviesRepository
    }  
  
  ]
})

export class AppModule {}
