import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model () {
    let currentMorning = this.modelFor('morning');
    let id = currentMorning.get('id');

    return this.get('store').query('morningAffirmation', { morning_id: id });
  },

  /* Looks for the first incomplete morningAffirmation and sets it to active */
  activateNextMorningAffirmation() {
    let model = this.controller.get('model');
    // if no morning affirmations, return false:
    if (model.length === 0) {
      return false;
    }

    // find the first morningAffirmation that is still incomplete
    let nextMA = model.find((morningAffirmation) => {
      return morningAffirmation.get('completed') === false;
    });

    // if an incomplete morningAffirmation was found, activate & return it
    if (nextMA) {
      nextMA.set('isActive', true);
      return nextMA;
    } else {
      // if no incomplete MA's, return false
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
      let nextMA = this.activateNextMorningAffirmation();
      if (!nextMA) {
        this.markMorningAsCompleted(this.modelFor('morning'));
        model.set('affirmationInProgress', true);
        return;
      }

      model.set('affirmationInProgress', true);

      // tickle the current morning
      this.getCurrentMorning(nextMA);
    },

    /* Checks to see if the submitted response matches the target response */
    checkMatch(response, currentMA) {
      // get the affirmation referenced by the current morningAffirmation
      let affirmation = this.getCurrentAffirmation(currentMA);
      // check to see if response matches
      if (affirmation.get('response') === response) {
        // if so, find the active MA and set its `completed` to true...
        this.markMorningAffirmationAsCompleted(currentMA);
        // ...and set its `isActive` to false
        this.deactivateMorningAffirmation(currentMA);

        // check to see if all MA's are completed
        if (!this.activateNextMorningAffirmation()) {
          // if all MA's completed, mark morning as completed
          let currentMorning = this.getCurrentMorning(currentMA);
          this.markMorningAsCompleted(currentMorning);
        }
        return true;
      } else {
        this.get('flashMessages')
        .danger('That doesn\'t quite match your affirmation. Try again!');
      }
    }
  }

});
