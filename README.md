# onodejs-rest-api-test-backend-minimum-time-to-remove-all-cars-containing-illegal-goods

## Description

Problem
You are given a **0-indexed** binary string s which represents a sequence of train cars. s[i] = '0' denotes that the ith car does **not** contain illegal goods and s[i] = '1' denotes that the ith car does contain illegal goods.
As the train conductor, you would like to get rid of all the cars containing illegal goods. You can do any of the following three operations any number of times:

1. Remove a train car from the **left** end (i.e., remove s[0]) which takes 1 unit of time.
2. Remove a train car from the **right** end (i.e., remove s[s.length - 1]) which takes 1 unit of time.
3. Remove a train car from **anywhere** in the sequence which takes 2 units of time.
   Return the **minimum** time to remove all the cars containing illegal goods.
   Note that an empty sequence of cars is considered to have no cars containing illegal goods.
   Examples:

### 1

INPUT: s = "1100101"
OUTPUT: 5
EXPLANATION:
One way to remove all the cars containing illegal goods from the sequence is to
● removeacarfromtheleftend2times.Timetakenis2*1=2.
● remove a car from the right end. Time taken is 1.
● remove the car containing illegal goods found in the middle. Time taken is 2.
This obtains a total time of 2 + 1 + 2 = 5.
An alternative way is to
● removeacarfromtheleftend2times.Timetakenis2*1=2.
● removeacarfromtherightend3times.Timetakenis3\*1=3.
This also obtains a total time of 2 + 3 = 5.
5 is the minimum time taken to remove all the cars containing illegal goods. There are no other ways to remove them with less time.

### 2

INPUT: s = "0010"
OUTPUT: 2
EXPLANATION:
One way to remove all the cars containing illegal goods from the sequence is to

● removeacarfromtheleftend3times.Timetakenis3\*1=3. This obtains a total time of 3.

Another way to remove all the cars containing illegal goods from the sequence is to
● remove the car containing illegal goods found in the middle. Time taken is 2.

This obtains a total time of 2.

Another way to remove all the cars containing illegal goods from the sequence is to
● removeacarfromtherightend2times.Timetakenis2\*1=2.

This obtains a total time of 2.

2 is the minimum time taken to remove all the cars containing illegal goods. There are no other ways to remove them with less time.

### Constraints

-   1 <= s.length <= 2 \* (10^5)
-   s[i] is either '0' or '1'.

### Solution

```js
const postMinimalTime = async (req, res, next) => {
    try {
        const string = req.body.string.toString();
        let length = string.length;
        if (length <= 0) {
            throw new Error("String can't be empty");
        }
        if (length > 200000 - string.slice(length - 1)) {
            throw new Error("String length can't be greater than 200000");
        }
        let left = 0;
        let result = length;

        for (let i = 0; i < length; i++) {
            if (
                string.slice(i, i + 1) != "1" &&
                string.slice(i, i + 1) != "0"
            ) {
                throw new Error("String must contain only 0 and 1");
            }
            left = Math.min(
                left + (parseInt(string.slice(i, i + 1)) - 0) * 2,
                i + 1,
            );
            result = Math.min(result, left + length - i - 1);
        }
        console.log("Output: ", result);
        res.status(200).json({ result: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};
```

### Test

```bash
npm run start
```

or

```bash
npm run docker
```

and use Postman to test the API. In the Body send the Binary String as a JSON object like this:

```json
{
    "string": "1100101"
}
```
