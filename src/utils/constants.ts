export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expiresIn: '1d',
};

export const requestPatterns = {
  tables: {
    users: 'users',
    auth: 'auth'
  },
  requests: {
    login: 'login',
    register: 'register',
    ggRegister: 'google.register',
    ggLogin: 'google.login',
    getAll: 'get_all',
    getOneById: 'get_item',
    getOneByEmail: 'get_item_by_email',
    create: 'create',
    update: 'update',
    remove: 'remove',
  }
}
