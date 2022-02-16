// using a parentOf[x] array

class UnionFind {
  constructor(size) {
    this.parentOf = new Array(size).fill(null).map((x, i) => i);
    this.sizeOf = new Array(size).fill(null).map((x) => 1);
  }

  findSetOf(x) {
    if (this.parentOf[x] !== x) {
      this.parentOf[x] = this.findSetOf(this.parentOf[x]);
    }
    return this.parentOf[x]; // if it's its own parent, or if parent is found
  }

  union(x, y) {
    let [smallParent, bigParent] = [this.findSetOf(x), this.findSetOf(y)];
    if (smallParent === bigParent) return smallParent;

    const namedWrongly = this.sizeOf[smallParent] > this.sizeOf[bigParent];
    if (namedWrongly) {
      [smallParent, bigParent] = [bigParent, smallParent];
    }

    // add smaller to bigger for better perf:
    this.parentOf[smallParent] = bigParent;
    this.sizeOf[bigParent] += this.sizeOf[smallParent];

    return bigParent;
  }

  isInSameSet(x, y) {
    return this.findSetOf(x) === this.findSetOf(y);
  }
}

exampleUsage();

function exampleUsage() {
  const data = [0, 1, 0, 1];

  const uf = new UnionFind(data.length);

  for (let i = 0; i < data.length; i++) {
    uf.union(data[i], i);
  }

  console.log(uf);
  data.forEach((x) => {
    console.log(`${x} is under group`, uf.findSetOf(x));
  });

  console.log(uf.isInSameSet(0, 0));
  console.log(uf.isInSameSet(0, 1));
  /**
   * UnionFind { parentOf: [ 2, 3, 2, 3 ], sizeOf: [ 1, 1, 2, 2 ] }
   * 0 is under group 2
   * 1 is under group 3
   * 0 is under group 2
   * 1 is under group 3
   * true
   * false
   */
}
