function SetNode(value, setName) {
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
    console.log(this.value);
    console.log(this.parent !== null ? "has parent" : "(no parents)");
    console.log(this.getNameOfSetImIn());
  },
};

// node example.js

var set1 = new SetNode(1, "Set 1");
set1.printProps();

var child = new SetNode("a");
child.parent = set1;
child.printProps();

var set2 = new SetNode(2, "Set 2");
set2.printProps();

var child2 = new SetNode("b");
child2.parent = set2;
child2.printProps();

var child3 = new SetNode("c");
child3.parent = child2;
child3.printProps();

set1.unionInto(set2);
set1.printProps();
console.log(set1.getNameOfSetImIn());
