import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    let store = this.get('store');

    return Ember.RSVP.hash({
      mornings: store.findAll('morning'),
      affirmations: store.findAll('affirmation')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  actions: {
    /* Transitions to /mornings/:morning_id for the current day's morning */
    startMyDay(mornings) {
      // look for an existing Morning recording matching today's date
      let today = new Date();
      let currentMorning = mornings.find((morning) => {
        return morning.get('createdAt').toDateString() === today.toDateString();
      });

      // if one already exists, transition to /mornings/:morning_id with it
      if (currentMorning) {
        this.transitionTo('morning', currentMorning);
      }
      else {
        // otherwise, create a new one and transition with it
        let morning = this.get('store').createRecord('morning');
        morning.save()
        .then((morning) => this.transitionTo('morning', morning));
      }
    }
  }
});
