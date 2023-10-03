import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './application/use-cases';
import typeorm from './infrastructure/database/configDB/typeorm';
import { User } from './infrastructure/database/entities';
import { AuthModule } from './infrastructure/modules/auth.module';
import { MenusModule } from './infrastructure/modules/menus.module';
import { PermissionGroupsModule } from './infrastructure/modules/permission-groups.module';
import { PermissionsModule } from './infrastructure/modules/permissions.module';
import { RolePermissionsModule } from './infrastructure/modules/role-permissions.module';
import { RolesModule } from './infrastructure/modules/roles.module';
import { UserRolesModule } from './infrastructure/modules/user-roles.module';
import { UsersModule } from './infrastructure/modules/users.module';
import { AppController } from './presentation/controllers';

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
