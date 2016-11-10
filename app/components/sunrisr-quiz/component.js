import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    response: null
  },

  actions: {
    checkMatch(morningAffirmation) {
      let form = this.get('form');
      let response = form.response;

      this.sendAction('checkMatch', response, morningAffirmation);
      this.set('form.response', null);
    }
  }
});
