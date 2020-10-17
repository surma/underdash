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

function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  it = it[Symbol.iterator]();
  for(; start > 0; start--, end--) await it.next();
  for await (let v of it) 
    if(end-- > 0)
      yield v;
    else
      break;
}

// Example:
slice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 9);
// returns [6, 7, 8, 9]
