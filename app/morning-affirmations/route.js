import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    console.log('you are in the morningAffirmations model hook');
    return this.get('store').findAll('morningAffirmation');
    // console.log('model is:', model);
    // return model;
  },

  actions: {
    // find the first incomplete morningAffirmation and set it to active
    startAffirming(model) {
      console.log('in startAffirming on the morning-affirmations route');
      let nextAffirmation = model.find((morningAffirmation) => {
        return morningAffirmation.get('completed') === false;
      });
      nextAffirmation.set('isActive', true);
      console.log('nextAffirmation.isActive is', nextAffirmation.get('isActive'));
    },
  }

});
