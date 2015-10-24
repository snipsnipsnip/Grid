QUnit.test("Grid", function(assert) {
  assert.ok(new Grid(), "Grid does nothing on 0 argument");
  assert.ok(new Grid('fixture-div'), "Grid accepts an ID of the target element");
  assert.ok(new Grid(document.getElementById('fixture-div')), "Grid accepts a DOM object of the target element");
});
