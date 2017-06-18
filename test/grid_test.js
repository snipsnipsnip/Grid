QUnit.test("Grid", function(assert) {
  assert.ok(new Grid(), "Grid does nothing on 0 argument");
  assert.ok(new Grid('fixture-div'), "Grid accepts an ID of the target element");
  assert.ok(new Grid(document.getElementById('fixture-div')), "Grid accepts a DOM object of the target element");
});

QUnit.module("Grid.ColumnGroup");

QUnit.test("Grid.ColumnGroup#expandSpec", function(assert) {
  var g = Grid.ColumnGroup.prototype

  var headerGroups = [
    {from: 5, to: 7, name: "Points"},
    {from: 1, to: 3, name: "Win-Loss"},
    {from: 8, to: 12, name: "Records"}
  ]

  assert.deepEqual(g.expandSpec(0, []), [])
  assert.deepEqual(g.expandSpec(1, []), [null, 1])
  assert.deepEqual(g.expandSpec(1, [{from: 0, to: 0, name: "foo"}]), ["foo", 1])
  assert.deepEqual(g.expandSpec(2, [{from: 0, to: 0, name: "foo"}]), ["foo", 1, null, 1])
  assert.deepEqual(g.expandSpec(2, [{from: 0, to: 1, name: "foo"}]), ["foo", 2])
  assert.deepEqual(g.expandSpec(2, [{from: 1, to: 1, name: "foo"}]), [null, 1, "foo", 1])
  assert.deepEqual(g.expandSpec(3, [{from: 2, to: 2, name: "foo"}]), [null, 2, "foo", 1])

  assert.throws(function() { g.expandSpec(100, [{from: 2, to: 1, name: "foo"}]) })
  assert.throws(function() { g.expandSpec(100, [
    {from: 1, to: 3, name: "foo"},
    {from: 2, to: 4, name: "foo"}
  ]) })

  assert.throws(function() {
    g.expandSpec(12, headerGroups)
  })
  assert.deepEqual(g.expandSpec(16, headerGroups), [
    null, 1,
    "Win-Loss", 3,
    null, 1,
    "Points", 3,
    "Records", 5,
    null, 3
  ])
  assert.deepEqual(g.expandSpec(13, headerGroups), [
    null, 1,
    "Win-Loss", 3,
    null, 1,
    "Points", 3,
    "Records", 5
  ])
});

QUnit.test("Grid.ColumnGroup#calcWidths", function(assert) {
  var g = Grid.ColumnGroup.prototype

  var widths = [33, 164, 33, 34, 27, 44, 42, 41, 68, 59, 53, 50, 58, 59, 63, 73, 97]
  var grouping = [
    null, 2,
    "Win-Loss", 3,
    null, 1,
    "Points", 3,
    "Records", 5,
    null, 3
  ]

  assert.deepEqual(g.calcWidths(widths, grouping), [
    33 + 164,
    33 + 34 + 27,
    44,
    42 + 41 + 68,
    59 + 53 + 50 + 58 + 59,
    63 + 73 + 97
  ])

  assert.deepEqual(g.calcWidths([1, 2, 4, 8, 16], [null, 2, null, 1, null, 2]), [
    3, 4, 24
  ])
});

QUnit.test("Grid.ColumnGroup#isTorn", function(assert) {
  var g = Grid.ColumnGroup.prototype

  var grouping = [
    null, 2,
    "Win-Loss", 3,
    null, 1,
    "Points", 3,
    "Records", 5,
    null, 3
  ]

  assert.notOk(g.isTorn(0, grouping))
  assert.notOk(g.isTorn(1, grouping))
  assert.notOk(g.isTorn(2, grouping))
  assert.ok(g.isTorn(3, grouping))
  assert.ok(g.isTorn(4, grouping))
  assert.notOk(g.isTorn(5, grouping))
  assert.notOk(g.isTorn(6, grouping))
  assert.ok(g.isTorn(7, grouping))
  assert.ok(g.isTorn(8, grouping))
  assert.notOk(g.isTorn(9, grouping))
  assert.ok(g.isTorn(10, grouping))
  assert.ok(g.isTorn(11, grouping))
  assert.ok(g.isTorn(12, grouping))
  assert.ok(g.isTorn(13, grouping))
  assert.notOk(g.isTorn(14, grouping))
  assert.notOk(g.isTorn(15, grouping))
  assert.notOk(g.isTorn(16, grouping))
  assert.notOk(g.isTorn(17, grouping))
  assert.notOk(g.isTorn(18, grouping))
});
