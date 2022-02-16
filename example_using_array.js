// using a parentOf[x] array

class UnionFind {
  constructor(size) {
    this.parentOf = new Array(size).map((x, i) => i);
    this.sizeOf = new Array(size).map((x) => 1);
  }

  find(x) {
    if (this.parentOf[x] !== x) {
      this.parentOf[x] = this.find(this.parentOf[x]);
    }
    return this.parentOf[x];
  }

  union(x, y) {
    let [smallParent, bigParent] = [this.find(x), this.find(y)];
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
}
