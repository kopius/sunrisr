import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log('in the morning model hook');
    return this.get('store').findRecord('morning', params.morning_id);
  },

  afterModel(morning) {
    if (morning.isToday) {
      this.transitionTo('morning.morning-affirmations');
    }
  }
});
