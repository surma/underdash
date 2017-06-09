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

it('returns true if condition is met at least once', function () {
  expect(f([1,9,2,9,1,4,2], e => e)).to.deep.equal([1,9,2,4]);
});

it('returns true if condition is met at least once', function () {
  expect(f([{i:0,v:1},{i:1,v:2},{i:2,v:1}], e => e.v)).to.deep.equal([{i:0,v:1},{i:1,v:2}]);
});
