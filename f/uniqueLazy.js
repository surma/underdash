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

function* unique(it, f = id => id) {
  const buffer = [];
  for (let v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1) continue;
    buffer.push(fv);
    yield v;
  }
}

// Example:
unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
// returns [{i:0,v:2},{i:1,v:3}]
