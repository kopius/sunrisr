import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit() {
      /* TODO: Finish this action and test it. It should add a flag to the
      underlying affirmation that the parent view uses to determine whether
      the affirmation is rendered statically or in edit mode  */
      return this.sendAction('edit', this.get('affirmation'));
    },
    delete() {
      /* TODO: Finish this action and test it. It should delete the underlying
      affirmation record and persist the deletion to the database. Don't forget
      to go into the API and set dependent: :destroy on affirmations */
      return this.sendAction('delete', this.get('affirmation'));
    },
  },
});
