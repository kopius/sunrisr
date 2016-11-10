import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('morning', params.morning_id);
  },

  afterModel() {
    this.transitionTo('morning.morning-affirmations');
  }
});
