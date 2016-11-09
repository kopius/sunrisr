import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    prompt: null,
    response: null,
  },

  actions: {
    /* TODO: Finish and test this action. Ensure the new record persists. */
    create() {
      let newAffirmation = this.get('form');

      this.sendAction('create', newAffirmation);

      this.set('form.prompt', null);
      this.set('form.response', null);
    },
  }
});
