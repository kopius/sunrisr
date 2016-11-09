import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    /* Sends form data to parent route to update an Affirmation record */
    save() {
      let editedAffirmation = this.get('affirmation');
      this.sendAction('save', editedAffirmation);
    },

    /* Breaks out of edit mode without saving changes */
    cancel() {
      let editedAffirmation = this.get('affirmation');
      this.sendAction('cancel', editedAffirmation);
    }
  }
});
