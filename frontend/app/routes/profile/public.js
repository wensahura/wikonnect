import Route from '@ember/routing/route';

export default class ProfilePublicRoute extends Route {
  model(param) {
    // const user = await this.store.findRecord('user', tokenData.data.id);
    return this.store.query('user', {
      filter: {
        username: param.user_slug
      }
    }).then(function (user) {
      // Do something with `peters`
      return user.get('firstObject');
    });
  }
}
