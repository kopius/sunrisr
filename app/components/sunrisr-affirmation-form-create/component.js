import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    prompt: null,
    response: null,
  },

  actions: {
    /* Sends form data to parent route to create a new Affirmation record */
    create() {
      let newAffirmation = this.get('form');

      this.sendAction('create', newAffirmation);

      this.set('form.prompt', null);
      this.set('form.response', null);
    },

    reset() {
      this.set('form.prompt', null);
      this.set('form.response', null);
    }
  }
});
