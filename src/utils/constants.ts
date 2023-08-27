export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expiresIn: '1d',
};

export const microservicesConstants = {
  userManagement: {
    NAME: 'USER_MANAGEMENT_MICROSERVICE',
    CLIENT_ID: 'user-management',
    BROKERS: ['Nhung-Nguyen:9092'],
    GROUP_ID: 'user-management-consumer',
  },
  notification: {
    NAME: 'NOTIFICATION_MICROSERVICE',
    CLIENT_ID: 'notification',
    BROKERS: ['Nhung-Nguyen:9092'],
    GROUP_ID: 'notification-consumer',
  },
};

export const requestPatterns = {
  tables: {
    users: 'users',
    auth: 'auth',
    userRoles: 'user_role',
    roles: 'roles',
    rolePermissions: 'role_permission',
    permissions: 'permissions',
    permissionGroups: 'permission_groups',
    menu: 'menu',
  },
  requests: {
    login: 'login',
    register: 'register',
    ggRegister: 'google.register',
    ggLogin: 'google.login',
    getAll: 'get_all',
    getOneById: 'get_item',
    getOneByEmail: 'get_item_by_email',
    getOneByName: 'get_item_by_name',
    getOneByKey: 'get_item_by_key',
    create: 'create',
    update: 'update',
    remove: 'remove',
  },
};
