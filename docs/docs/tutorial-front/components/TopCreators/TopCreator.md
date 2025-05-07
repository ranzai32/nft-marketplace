---

sidebar\_label: 'TopCreators.js'
title: 'TopCreators.js'
---

# getTopCreators Function Documentation

## Overview

The `getTopCreators` utility function aggregates sales data by seller to compute the total sales volume for each NFT creator. It transforms an array of individual sale records into a summary list of creators with their cumulative earnings.

## Purpose

* **Group sales records** by each seller address.
* **Sum the `price` values** for all records belonging to the same seller.
* **Return a list** of objects where each object represents a seller with their total sales volume.

## File Structure

* **Location:** `utils/TopCreators.js` (or similar utility directory)
* **Exports:**

  * `export const getTopCreators = (creators) => { ... }`

## Function Signature

```js
getTopCreators(creators: Array<{ seller: string, price: string | number, [key: string]: any }>)
  : Array<{ seller: string, total: number }>
```

### Parameters

| Name       | Type            | Description                                      |
| ---------- | --------------- | ------------------------------------------------ |
| `creators` | `Array<Object>` | Array of sale records. Each record must include: |
|            |                 | - `seller`: Creator's address or identifier.     |
|            |                 | - `price`: Sale price (string or number).        |
|            |                 | - Other fields can be present but are ignored.   |

### Returns

`Array<Object>` — List of aggregated creator objects:

| Name     | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `seller` | `string` | Creator's address or identifier.    |
| `total`  | `number` | Sum of all prices for that creator. |

## Implementation Details

1. **Grouping with `reduce`**

   ```js
   const finalResults = creators.reduce((index, record) => {
     const key = record.seller;
     if (!index[key]) index[key] = [];
     index[key].push(record);
     return index;
   }, {});
   ```

   * Creates an object (`finalResults`) mapping each `seller` to an array of their sale records.

2. **Summing totals**

   ```js
   Object.entries(finalResults).forEach(([seller, records]) => {
     const total = records
       .map(item => Number(item.price))
       .reduce((sum, price) => sum + price, 0);
     finalCreators.push({ seller, total });
   });
   ```

   * Converts each `price` to `Number` and accumulates via `reduce`.

3. **Return value**

   * `finalCreators` is populated with `{ seller, total }` objects and returned.

## Usage Example

```js
import { getTopCreators } from './TopCreators';

const salesData = [
  { seller: '0xA1', price: '1.5' },
  { seller: '0xB2', price: 2 },
  { seller: '0xA1', price: '0.75' }
];

const topCreators = getTopCreators(salesData);
console.log(topCreators);
// Output:
// [ { seller: '0xA1', total: 2.25 }, { seller: '0xB2', total: 2 } ]
```

---
