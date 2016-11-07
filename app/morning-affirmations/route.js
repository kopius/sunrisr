import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    console.log('you are in the morningAffirmations model hook');
    return this.get('store').findAll('morningAffirmation');
  },

  // this method does not currently work
  // something like this may be needed elsewhere in the app
  // to see if a new morning needs to be created
  // maybe do this at login? also a good opportunity to tickle
  // the current morning
  getCurrentMorning() {
    console.log('in getCurrentMorning. this is:', this);
    // get all mornings
    let mornings = this.get('store').findAll('morning');

    // get parameters for comparison
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getYear();

    // check mornings for a matching date
    mornings.forEach((morning) => {
      // get parameters for comparison
      let date = morning.createdAt.getDate();
      let month = morning.createdAt.getMonth();
      let year = morning.createdAt.getYear();

      if (date === currentDate &&
          month === currentMonth &&
          year === currentYear) {
        console.log('this morning is a match! returning:', morning);
        return morning;
      }
    });
  },

  activateNextMorningAffirmation() {
    console.log('in activateNextMorningAffirmation');
    let model = this.controller.get('model');
    // TODO: this code is repeated in a couple of places - come back and factor it out
    let nextMA = model.find((morningAffirmation) => {
      return morningAffirmation.get('completed') === false;
    });
    if (nextMA) {
      nextMA.set('isActive', true);
      console.log('nextMA is', nextMA);
      return true;
    } else {
      console.log('there is no nextMA');
      return false;
    }
  },

  actions: {
    // find the first incomplete morningAffirmation and set it to active
    startAffirming(model) {
      console.log('in startAffirming on the morning-affirmations route');
      let nextMA = model.find((morningAffirmation) => {
        return morningAffirmation.get('completed') === false;
      });
      nextMA.set('isActive', true);

      // tickle the current morning
      let currentMorning = nextMA.get('morning');
      console.log('ticking the current morning:', currentMorning);

      console.log('nextMA.isActive is', nextMA.get('isActive'));
    },

    // TODO: break this method out into several helper methods
    checkMatch(response, morningAffirmation) {
      console.log('in checkMatch on the morning-affirmations route');
      console.log('response is', response);
      let affirmation = morningAffirmation.get('affirmation');
      console.log('affirmation is', affirmation);

      // check to see if response matches
      if (affirmation.get('response') === response) {
        // if so:
        console.log('response is a match! yaaaaaay!');
        // find the active MA and set its `completed` to true and `isActive` to false
        morningAffirmation.set('completed', true);
        morningAffirmation.set('isActive', false);

        // get the current morning
        let currentMorning = morningAffirmation.get('morning');
        console.log('back in checkMatch, currentMorning is:', currentMorning);

        // check to see if all MA's are completed
        if (!this.activateNextMorningAffirmation()) {
          currentMorning.set('completedAll', true);
          console.log('back in checkMatch, all morning affirmations complete');
        }
        return true;
      } else {
        console.log('NO MATCHY');
        return false;
      }
    }
  }

});
