import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    console.log('you are in the morningAffirmations model hook');
    return this.get('store').findAll('morningAffirmation');
    // console.log('model is:', model);
    // return model;
  }
});
