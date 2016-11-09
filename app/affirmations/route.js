import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('affirmation');
  },

  // form: {
  //   prompt: null,
  //   response: null,
  // },

  actions: {
    /* Create a new Affirmation record with parameters from form data, persist
       the new record to the server, and reset the form fields */
    createAffirmation(newAffirmation) {
      console.log('in createAffirmation, newAffirmation is', newAffirmation);
      let affirmation = this.get('store').createRecord('affirmation',
                                                       newAffirmation);
      affirmation.save();
      //
      // this.set('form.prompt', null);
      // this.set('form.response', null);
    },

    /* Open the editing form for an Affirmation record */
    editAffirmation(affirmation) {
      console.log('in editAffirmation on affirmations route, affirmation is:', affirmation);
      affirmation.set('isEditing', true);
    },

    /* Delete an Affirmation record and persist the deletion to the server */
    deleteAffirmation(affirmation) {
      console.log('in deleteAffirmation on affirmations route, affirmation is:', affirmation);
      affirmation.deleteRecord();
      console.log('affirmation was deleted?', affirmation.get('isDeleted')); // => true
      affirmation.save(); // => DELETE to /affirmations/:affirmation_id
    },

    /* Accept an edited Affirmation record and persist changes to the server */
    saveAffirmationEdits(affirmation) {
      // persist changes to the server via Ember Data
      affirmation.save();
      // close the edit form
      affirmation.set('isEditing', false);
    },

    /* Close the editing form without saving changes */
    cancelAffirmationEdits(affirmation) {
      affirmation.rollbackAttributes();
      affirmation.set('isEditing', false);
    }
  }
});
