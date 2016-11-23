import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  /* Model hook for the /morning/:morning_id/morning-affirmations route */
  model () {
    // gain access to the model from the parent route, /morning/:morning_id
    let currentMorning = this.modelFor('morning');
    let id = currentMorning.get('id');

    // return all morningAffirmation records belonging to the current morning
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
      // if no incomplete MA's exist, return false
      return false;
    }
  },

  /* Checks stored response and input response for a case-insensitive match */
  compareResponses(r1, r2) {
    // convert inputs to uppercase
    r1 = r1.toUpperCase();
    r2 = r2.toUpperCase();

    return (r1 === r2);
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

  /* Actions for the /morning/:morning_id/morning-affirmations route */
  actions: {

    /* Checks to see if the submitted response matches the target response */
    checkMatch(inputResponse, currentMA) {
      // get the parent affirmation for the current morningAffirmation
      let affirmation = this.getCurrentAffirmation(currentMA);
      let storedResponse = affirmation.get('response');

      // check to see if the stored response matches the input response
      if (this.compareResponses(storedResponse, inputResponse)) {
        // if so, set the current morningAffirmation's `completed' flag to true
        this.markMorningAffirmationAsCompleted(currentMA);
        // and set its `isActive` flag to false
        this.deactivateMorningAffirmation(currentMA);

        // check to see if all morningAffirmations are completed
        // if not, activate the next one
        if (!this.activateNextMorningAffirmation()) {
          // if all MA's are completed, mark the current morning as completed
          let currentMorning = this.getCurrentMorning(currentMA);
          this.markMorningAsCompleted(currentMorning);
        }
        return true;
      } else {
        // if the input response didn't match, encourage user to try again
        // via the injected flashMessages service
        this.get('flashMessages')
        .danger('That doesn\'t quite match your affirmation. Try again!');
      }
    },

    /* Loads & activates the necessary data to display the affirmation quiz */
    startAffirming(model) {
      // activate the first incomplete morningAffirmation record
      let nextMA = this.activateNextMorningAffirmation();

      // if there are no incomplete MA's, mark the morning as completed
      if (!nextMA) {
        this.markMorningAsCompleted(this.modelFor('morning'));
        // flip the 'in progress' flag so that the completion message displays
        model.set('affirmationInProgress', true);
        return;
      }

      // toggle the view state by flipping the 'in progress' flag
      model.set('affirmationInProgress', true);

      // make sure Ember Data has pre-loaded the current morning record
      this.getCurrentMorning(nextMA);
    },
  }
});
