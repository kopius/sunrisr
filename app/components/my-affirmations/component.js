import Ember from 'ember';

export default Ember.Component.extend({

  hasAffirmations: Ember.computed.bool('affirmations.length'),

  actions: {
    /* Sends form data to parent route to create a new Affirmation record */
    createAffirmation(newAffirmation) {
      this.sendAction('createAffirmation', newAffirmation);
    },

    /* Sends form data to parent route to update an Affirmation record */
    saveAffirmationEdits(editedAffirmation) {
      this.sendAction('saveAffirmationEdits', editedAffirmation);
    },

    /* Breaks out of edit mode without saving changes */
    cancelAffirmationEdits(editedAffirmation) {
      this.sendAction('cancelAffirmationEdits', editedAffirmation);
    },

    /* Opens edit mode for the selected Affirmation record */
    editAffirmation(affirmation) {
      this.sendAction('editAffirmation', affirmation);
    },

    /* Deletes the selected Affirmation record */
    deleteAffirmation(affirmation) {
      this.sendAction('deleteAffirmation', affirmation);
    },
  }
});
