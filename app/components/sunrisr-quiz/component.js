import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    response: null
  },

  actions: {
    checkMatch(morningAffirmation) {
      console.log('in checkMatch on sunrisr-quiz component');
      let form = this.get('form');
      let response = form.response;
      console.log("response is", response);
      console.log('morningAffirmation is', morningAffirmation);

      this.sendAction('checkMatch', response, morningAffirmation);
      this.set('form.response', null);
    }
  }
});
