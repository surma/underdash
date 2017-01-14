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

function* slice(arr, start, end) {
  if (typeof start !== 'number') start = 0;
  if (start < 0) start = arr.length + start;
  if (start < 0) start = 0;
  if (start >= arr.length) return;

  if (typeof end !== 'number') end = arr.length;
  if (end < 0) end = arr.length + end;
  if (end > arr.length) end = arr.length;
  if (end <= 0) return;

  if (end <= start) return;

  for (let i = start; end > i; i++) yield arr[i];
}

// Example:
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(5, 9);
// returns [6, 7, 8, 9]
