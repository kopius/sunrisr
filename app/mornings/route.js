import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    console.log('in the mornings model hook');
    return this.get('store').findAll('morning');
  },

  actions: {
    /* Transitions to /mornings/:morning_id for the current day's morning */
    startMyDay(mornings) {
      console.log('in startMyDay');
      console.log('mornings is', mornings);
      // look for an existing Morning recording matching today's date
      let today = new Date();
      let currentMorning = mornings.find((morning) => {
        console.log('in mornings.find, morning is', morning);
        return morning.get('createdAt').toDateString() === today.toDateString();
      });
      console.log('currentMorning is', currentMorning);

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
