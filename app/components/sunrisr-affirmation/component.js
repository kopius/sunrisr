import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit() {
      /* Opens edit mode for the selected Affirmation record */
      return this.sendAction('edit', this.get('affirmation'));
    },
    delete() {
      /* Deletes the selected Affirmation record */
      return this.sendAction('delete', this.get('affirmation'));
    },
  },
});
