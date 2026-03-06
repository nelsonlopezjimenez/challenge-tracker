Several approaches, from simplest to most creative:

**1. `includes` on a string (most common)**
```javascript
const isVowel = (ch) => 'aeiouAEIOU'.includes(ch);
```

**2. `Set` lookup (fastest for repeated calls)**
```javascript
const vowels = new Set('aeiouAEIOU');
const isVowel = (ch) => vowels.has(ch);
```

**3. Regex**
```javascript
const isVowel = (ch) => /^[aeiou]$/i.test(ch);
```

**4. `indexOf` (old school, pre-ES6)**
```javascript
const isVowel = (ch) => 'aeiouAEIOU'.indexOf(ch) !== -1;
```

**5. Object lookup**
```javascript
const vowels = { a:1, e:1, i:1, o:1, u:1 };
const isVowel = (ch) => ch.toLowerCase() in vowels;
```

**6. `switch` (verbose but explicit)**
```javascript
function isVowel(ch) {
  switch (ch.toLowerCase()) {
    case 'a': case 'e': case 'i': case 'o': case 'u':
      return true;
    default:
      return false;
  }
}
```

**For your students:** teach #1 as the go-to — readable, concise, no setup. Mention #2 for when they learn about performance (Set is O(1) vs includes O(n), though with only 10 characters the difference is negligible). Show #3 when covering regex.
