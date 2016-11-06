import { moduleForModel, test } from 'ember-qunit';

moduleForModel('morning-affirmation', 'Unit | Model | morning affirmation', {
  // Specify the other units that are required for this test.
  needs: ['model:affirmation', 'model:morning']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
