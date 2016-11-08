import DS from 'ember-data';

export default DS.Model.extend({
  prompt: DS.attr('string'),
  response: DS.attr('string'),
  morningAffirmations: DS.hasMany('morning-affirmation')
});
