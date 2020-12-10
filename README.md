# Learning union-find data structure (for sets)

Just one of the things I'm learning. <https://github.com/hchiam/learning>

## Why

Implement sets with fast set membership checks _and_ fast set unions/intersections.

## How

Children point to parents. Root parent represents the set. When combining sets, always merge into the taller tree (to guarantee logarithmic height). Use path compression to flatten the tree on each find (along the search path), to speed up traversal from `O(log n)` to `O(1)`.

## Attempted option comparison summary

| set implementation                          | get all in set | intersection/union | find which set x is in                                  | in 1 set, find x                                     | move to another set |
| ------------------------------------------- | -------------- | ------------------ | ------------------------------------------------------- | ---------------------------------------------------- | ------------------- |
| `{:}`                                       | `O(n)`         | `O(n)`             | `O(kn)` or `O(k log n)` with sorted keys implementation | `O(n)` or `O(log n)` with sorted keys implementation | `O(1)`              |
| bits `[,,]`                                 | `O(n)`         | `O(n)`             | `O(k)`                                                  | `O(1)`                                               | `O(1)`              |
| binary tree root as set                     | `O(n)`         | `O(n) ?`           | `O(k log n)`                                            | `O(log n)`                                           | `O(log n) ?`        |
| root as set, but all children point parents | `?`            | `O(~1)`            | `O(~k)` if use path compression                         | `O(~1)` if use path compression                      | `?`                 |

- where `n` = number of items in an average set ; `k` = number of all sets
- note that the last option is unable to break up a set

## My earlier notes

Using the union-find data structure is motivated by the disadvantages with other ways to implement sets:

- if you turn each set into a dictionary of its elements:
  - :) `O(n)` for getting all elements in a set
  - :) `O(n)` for getting set unions and set intersections, and `O(log n)` for search, _if you implement the dictionary with sorted keys_
  - :( `O(kn)` for checking which set an element is in
- if you turn each element into an array of bits that indicate which set the element is in:
  - :) `O(1)` for checking which set an element is in
  - :) `O(1)` for changing which set an element is in
  - :( `O(m + n)` for getting set unions and set intersections (to identify and update at least one set's elements)
- if you put each element into a binary tree with a field that indicates which set the element is in:
  - :) `O(dictionary search)` for checking which set an element is in
  - :) `O(dictionary search)` for changing which set an element is in
  - :( `O(slow)` for getting set unions and set intersections (typically not fast enough)

Meanwhile for the union-find data structure:

- :) `O(log n)` for checking which set an element is in,
  - or [near `O(1)`](https://en.wikipedia.org/wiki/Disjoint-set_data_structure#:~:text=near%20constant%20amortized%20time) if you use path compression ("flatten" the tree so all children directly point to the parent root)
- :) [near `O(1)`](https://en.wikipedia.org/wiki/Disjoint-set_data_structure#:~:text=near%20constant%20amortized%20time) for getting set unions and set intersections (just make one root point to the other root, preferably into the taller tree to guarantee logarithmmic height)
- :( disadvantage: doesn't support breaking up a set that was created by unions :( but usually not an issue/requirement apparently :)

## Reference

Read the section on union-find data structure in ["The Algorithm Design Manual" by Steven Skiena](http://www.algorist.com).

## Further reading

<https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf>

<https://en.wikipedia.org/wiki/Disjoint-set_data_structure>

## Example

```bash
node example.js
```
