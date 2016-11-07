import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model () {
    console.log('you are in the morningAffirmations model hook');
    return this.get('store').findAll('morningAffirmation');
  },

  // this method does not currently work
  // something like this may be needed elsewhere in the app
  // to see if a new morning needs to be created
  // maybe do this at login? also a good opportunity to tickle
  // the current morning
  checkForMorning() {
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
    // find the first morningAffirmation that is still incomplete
    let nextMA = model.find((morningAffirmation) => {
      return morningAffirmation.get('completed') === false;
    });

    // if an incomplete morningAffirmation was found, activate & return it
    if (nextMA) {
      nextMA.set('isActive', true);
      console.log('nextMA is', nextMA);
      return nextMA;
    } else {
      // if no incomplete MA's, return false
      console.log('there is no nextMA');
      return false;
    }
  },

  deactivateMorningAffirmation(morningAffirmation) {
    morningAffirmation.set('isActive', false);
  },

  getCurrentAffirmation(morningAffirmation) {
    return morningAffirmation.get('affirmation');
  },

  getCurrentMorning(morningAffirmation) {
    return morningAffirmation.get('morning');
  },

  markMorningAffirmationAsCompleted(morningAffirmation) {
    morningAffirmation.set('completed', true);
  },

  markMorningAsCompleted(morning) {
    morning.set('completedAll', true);

    // FIXME: temporary workaround to allow listening for completion
    let model = this.controller.get('model');
    model.set('doneAffirming', true);
  },

  actions: {
    // find the first incomplete morningAffirmation and set it to active
    startAffirming(model) {
      console.log('in startAffirming on the morning-affirmations route');

      let nextMA = this.activateNextMorningAffirmation();

      model.set('affirmationInProgress', true);

      // tickle the current morning
      let currentMorning = this.getCurrentMorning(nextMA);

      console.log('tickling the current morning:', currentMorning);
      console.log('nextMA.isActive is', nextMA.get('isActive'));
    },

    checkMatch(response, currentMA) {

      console.log('in checkMatch on the morning-affirmations route');
      console.log('response is', response);

      // get the affirmation referenced by the current morningAffirmation
      let affirmation = this.getCurrentAffirmation(currentMA);

      console.log('affirmation is', affirmation);

      // check to see if response matches
      if (affirmation.get('response') === response) {
        // if so:
        console.log('response is a match! yaaaaaay!');

        // if so, find the active MA and set its `completed` to true...

        this.markMorningAffirmationAsCompleted(currentMA);
        // ...and set its `isActive` to false
        this.deactivateMorningAffirmation(currentMA);

        // get the current morning
        let currentMorning = this.getCurrentMorning(currentMA);

        console.log('back in checkMatch, currentMorning is:', currentMorning);

        // check to see if all MA's are completed
        if (!this.activateNextMorningAffirmation()) {
          this.markMorningAsCompleted(currentMorning);

          // either activate an all-complete message, or have one already
          // listening for morning.completeAll = true

          console.log('back in checkMatch, all morning affirmations complete');
        }
        return true;
      } else {
        console.log('NO MATCHY');

        this.get('flashMessages')
        .danger('That doesn\'t quite match your affirmation. Try again!');
        // do something here to display a 'no match, try again' message in the UI

        return false;
      }
    }
  }

});
