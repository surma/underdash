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

function equals(it1, it2) {
  it1 = it1[Symbol.iterator]();
  it2 = it2[Symbol.iterator]();
  for (;;) {
    let i1 = it1.next(), i2 = it2.next();
    if (i1.value !== i2.value) return false;
    if (i1.done || i2.done) return i1.done && i2.done;
  }
}

// Example:
equals([1,2,3,'hello'], [1,2,3,'hello']);
// returns true