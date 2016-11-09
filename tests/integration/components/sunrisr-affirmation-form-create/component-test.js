import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sunrisr-affirmation-form-create', 'Integration | Component | sunrisr affirmation form create', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sunrisr-affirmation-form-create}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sunrisr-affirmation-form-create}}
      template block text
    {{/sunrisr-affirmation-form-create}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
