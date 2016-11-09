import Ember from 'ember';

export default Ember.Component.extend({

  hasAffirmations: Ember.computed.bool('affirmations.length'),

  actions: {
    startMyDay(mornings) {
      this.sendAction('startMyDay', mornings);
    }
  }
});
