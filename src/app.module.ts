import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { RolesModule } from './modules/roles.module';
import { UserRolesModule } from './modules/user-roles.module';
import { RolePermissionsModule } from './modules/role-permissions.module';
import { PermissionsModule } from './modules/permissions.module';
import { PermissionGroupsModule } from './modules/permission-groups.module';
import { MenusModule } from './modules/menus.module';
import { User } from './core/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
    UserRolesModule,
    RolesModule,
    RolePermissionsModule,
    PermissionsModule,
    PermissionGroupsModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
