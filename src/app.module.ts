import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mydb',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
