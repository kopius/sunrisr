import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('affirmation');
  },

  form: {
    prompt: null,
    response: null,
  },

  actions: {
    /* TODO: Finish and test this action. Ensure the new record persists. */
    createAffirmation() {
      let newAffirmation = this.get('form');
      let affirmation = this.get('store').createRecord('affirmation',
                                                       newAffirmation);
      affirmation.save();

      this.set('form.prompt', null);
      this.set('form.response', null);
    },

    editAffirmation(affirmation) {
      /* TODO */
      console.log('in editAffirmation on affirmations route, affirmation is:', affirmation);
      affirmation.set('isEditing', true);
    },

    deleteAffirmation(affirmation) {
      /* TODO */
      console.log('in deleteAffirmation on affirmations route, affirmation is:', affirmation);
      affirmation.deleteRecord();
      console.log('affirmation was deleted?', affirmation.get('isDeleted')); // => true
      affirmation.save(); // => DELETE to /affirmations/1
    }
  }
});
