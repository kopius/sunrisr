import DS from 'ember-data';

export default DS.Model.extend({
  completed: DS.attr('boolean'),
  affirmation: DS.belongsTo('affirmation'),
  morning: DS.belongsTo('morning')
});
