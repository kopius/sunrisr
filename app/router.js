import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('mornings');
  this.route('morning', { path: '/mornings/:morning_id' }, function() {
    this.route('morning-affirmations');
  });
  this.route('affirmations');
  this.route('affirmation');
});

export default Router;
