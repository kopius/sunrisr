import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model () {
    console.log('you are in the morningAffirmations model hook');
    let currentMorning = this.modelFor('morning');
    console.log('currentMorning is', currentMorning);
    let id = currentMorning.get('id');

    return this.get('store').query('morningAffirmation', { morning_id: id });
  },

  /* Looks for the first incomplete morningAffirmation and sets it to active */
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

  /* Sets the isActive flag to false on a morningAffirmation  */
  deactivateMorningAffirmation(morningAffirmation) {
    morningAffirmation.set('isActive', false);
  },

  /* Gets and returns the affirmation to which a morningAffirmation belongs  */
  getCurrentAffirmation(morningAffirmation) {
    return morningAffirmation.get('affirmation');
  },

  /* Gets and returns the morning to which a morningAffirmation belongs  */
  getCurrentMorning(morningAffirmation) {
    return morningAffirmation.get('morning');
  },

  /* Sets the completed flag to false on a morningAffirmation
  and persists this change to the server */
  markMorningAffirmationAsCompleted(morningAffirmation) {
    morningAffirmation.set('completed', true);
    console.log('in markMorningAffirmationAsCompleted, trying to save this morningAffirmation', morningAffirmation);
    morningAffirmation.save();
  },

  /* Sets the completedAll flag to false on a morning. Does not need to persist,
  because this is a virtual property on the API */
  markMorningAsCompleted(morning) {
    morning.set('completedAll', true);
  },

  actions: {
    /* Finds the first incomplete morningAffirmation and sets it to active */
    startAffirming(model) {
      console.log('in startAffirming on the morning-affirmations route');

      let nextMA = this.activateNextMorningAffirmation();

      model.set('affirmationInProgress', true);

      // tickle the current morning
      let currentMorning = this.getCurrentMorning(nextMA);

      console.log('tickling the current morning:', currentMorning);
      console.log('nextMA.isActive is', nextMA.get('isActive'));
    },

    /* Checks to see if the submitted response matches the target response */
    checkMatch(response, currentMA) {
      console.log('in checkMatch on the morning-affirmations route');
      console.log('response is', response);

      // get the affirmation referenced by the current morningAffirmation
      let affirmation = this.getCurrentAffirmation(currentMA);

      console.log('affirmation is', affirmation);

      // check to see if response matches
      if (affirmation.get('response') === response) {
        console.log('response is a match! yaaaaaay!');

        // if so, find the active MA and set its `completed` to true...
        this.markMorningAffirmationAsCompleted(currentMA);
        // ...and set its `isActive` to false
        this.deactivateMorningAffirmation(currentMA);

        // check to see if all MA's are completed
        if (!this.activateNextMorningAffirmation()) {
          // if all MA's completed, mark morning as completed
          let currentMorning = this.getCurrentMorning(currentMA);
          this.markMorningAsCompleted(currentMorning);

          console.log('back in checkMatch, all morning affirmations complete');
        }
        return true;
      } else {
        console.log('NO MATCHY');

        this.get('flashMessages')
        .danger('That doesn\'t quite match your affirmation. Try again!');
        return false;
      }
    }
  }

});
