import DS from 'ember-data';

export default DS.Model.extend({
  completedAll: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  hasMany: DS.attr('morning-affirmation')
});
