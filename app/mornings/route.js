import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    console.log('in the mornings model hook');
    return this.get('store').findAll('morning');
  },

  getCurrentMorning(mornings) {
    let today = new Date();
    let currentMorning = mornings.find((morning) => {
      console.log('in mornings.find, morning is', morning);
      return morning.get('createdAt').toDateString() === today.toDateString();
    });

    if(!currentMorning) {
      console.log('no current morning, must create one');
      // currentMorning = createMorning(); // TODO: define this function
    }

    return currentMorning;
  },

  afterModel(mornings) {
    console.log('in the mornings afterModel hook, mornings arg is', mornings);
    // debugger;
    // mornings.forEach((morning => {
    //   console.log(morning.get('createdAt').toDateString());
    // }));

    let currentMorning = this.getCurrentMorning(mornings);
    // let currentMorning = mornings.find(this.isCurrentMorning, this);
    // if (!currentMorning) {
    //   console.log('current morning does not exist yet');
    //   // create new morning record and assign to currentMorning
    // }
    currentMorning.set('isToday', true);
    console.log('currentMorning is', currentMorning);
    console.log('currentMorning.isToday is', currentMorning.get('isToday'));
  },



  actions: {

  }
});
