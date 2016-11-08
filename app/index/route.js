import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  beforeModel() {
    if (!this.get('isAuthenticated')) {
      this.transitionTo('sign-in');
    }
  }
});
