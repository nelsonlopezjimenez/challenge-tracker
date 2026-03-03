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

No problem. Nested functions are scoped inside their parent — they work as expected:

```javascript
function greet(name) {
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  return `Hello, ${capitalize(name)}!`;
}
```

The specs test `greet`, not `capitalize`. When `greet` runs, it finds `capitalize` in its own scope. Everything works.

**Same with arrow functions nested inside:**

```javascript
const greet = (name) => {
  const format = (s) => s.trim().toLowerCase();
  return `Hello, ${format(name)}!`;
};
```

Still fine — `format` lives inside `greet`'s closure.

**The only scenario that would break** is if your spec directly tests a nested function by name:

```javascript
// spec
it("should capitalize", () => {
  expect(capitalize("ana")).toBe("Ana");  // ❌ capitalize is not defined
});
```

But that's an instructor concern, not a student one. As long as your specs test the top-level functions listed in the template, students are free to create whatever helper functions they want inside them. That's actually good practice — encourage them to decompose problems.

