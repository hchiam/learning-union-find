function SetNode(value, setName = value) {
  this.value = value;
  this.parent = null;
  this.setName = setName;
}

SetNode.prototype = {
  constructor: SetNode,

  getNameOfSetImIn: function () {
    if (!this.parent) {
      return this.setName;
    }
    return this.parent.getNameOfSetImIn();
  },

  unionInto: function (setToMergeInto) {
    // TODO: detect taller tree, merge into that one
    // for now: merge this set into setToMergeInto
    this.parent = setToMergeInto;
    this.setName = null;
  },

  printProps: function () {
    console.log();
    console.log("Value: " + this.value);
    console.log(this.parent !== null ? "has parent" : "(no parents)");
    console.log("Set: " + this.getNameOfSetImIn());
  },
};

// node example.js

var set1 = new SetNode("Set 1");
set1.printProps();

var child1 = new SetNode("child 1");
child1.parent = set1;
child1.printProps();

var set2 = new SetNode("Set 2");
set2.printProps();

var child2 = new SetNode("child 2");
child2.parent = set2;
child2.printProps();

var child3 = new SetNode("child 3");
child3.parent = child2;
child3.printProps();

set1.unionInto(set2);
set1.printProps();
console.log(set1.getNameOfSetImIn());
