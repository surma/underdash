/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

it('returns a portion of an array selected from start to end (end not included)', function () {
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 4)).to.deep.equal([4]);
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 7)).to.deep.equal([3, 4, 5, 6, 7]);
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 9)).to.deep.equal([6, 7, 8, 9]);
});

it('return an empty array if start >= length of array', function () {
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20, 5)).to.deep.equal([]);
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, 7)).to.deep.equal([]);
});

it('return an empty array if start == end', function () {
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 5)).to.deep.equal([]);
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 3)).to.deep.equal([]);
});

it('if the end is negative indicates an offset from the end', function () {
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, -5)).to.deep.equal([3, 4, 5]);
  expect(f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, -3)).to.deep.equal([4, 5, 6, 7]);
});
