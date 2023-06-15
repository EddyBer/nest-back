import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { USERS } from './modules/user/user.model';
import { UsersModule } from './modules/user/user.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ClientsModule } from './modules/clients/clients.module';
import {AuthModule} from  './auth/auth.module';
import { CLIENTS } from './modules/clients/clients.model';
import { PROJECTS } from './modules/projects/projects.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mydb',
      models: [USERS,CLIENTS,PROJECTS],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    ClientsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
