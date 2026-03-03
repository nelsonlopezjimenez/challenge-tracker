# PROMPT: If students  modify the function declaration to an arrow functions what might happen with the current code

With the combined `new Function` approach from the fix, **arrow functions work fine**:

```javascript
// This works — const is declared before specs run
const greet = (name) => `Hello, ${name}!`;
```

The combined code runs top-to-bottom: student code first, then specs. By the time `describe`/`it` execute, `greet` already exists in scope.

**The only gotcha is if a student rewrites the declaration but adds code below it that references it before declaration:**

```javascript
console.log(greet("test"));  // ReferenceError — TDZ!
const greet = (name) => `Hello, ${name}!`;
```

With `function greet()` this would work due to hoisting. With `const greet =` it fails because of the TDZ — which is actually **a good teaching moment**. Students see the error, you explain hoisting vs TDZ in a real context they just experienced.

So no code changes needed. If anything, it's a feature for your course.

