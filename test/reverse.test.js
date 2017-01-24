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

it('returns values in reverse order', function () {
  expect(f([20,10,0,1,2,3,4,5])).to.deep.equal([5, 4, 3, 2, 1, 0, 10, 20]);
  expect(f([1,2,3,4,5])).to.deep.equal([5, 4, 3, 2, 1]);
  expect(f([3,4,'hello','bye',true])).to.deep.equal([true, 'bye', 'hello', 4, 3]);
});
