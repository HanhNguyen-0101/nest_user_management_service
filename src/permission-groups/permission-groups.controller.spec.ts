import { Test, TestingModule } from '@nestjs/testing';
import { PermissionGroupsController } from './permission-groups.controller';
import { PermissionGroupsService } from './permission-groups.service';

describe('PermissionGroupsController', () => {
  let controller: PermissionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionGroupsController],
      providers: [PermissionGroupsService],
    }).compile();

    controller = module.get<PermissionGroupsController>(
      PermissionGroupsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
