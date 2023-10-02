import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers';
import { User } from '../core/entities/user.entity';
import typeorm from '../frameworks/db/typeorm';
import { AppService } from '../useCases/app.service';
import { AuthModule } from './auth.module';
import { MenusModule } from './menus.module';
import { PermissionGroupsModule } from './permission-groups.module';
import { PermissionsModule } from './permissions.module';
import { RolePermissionsModule } from './role-permissions.module';
import { RolesModule } from './roles.module';
import { UserRolesModule } from './user-roles.module';
import { UsersModule } from './users.module';

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
