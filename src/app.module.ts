import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { MenusModule } from './menus/menus.module';
import { User } from './entities/user.entity';

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
