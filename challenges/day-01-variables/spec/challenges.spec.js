describe("Challenge 1: greet", function () {
  it("should greet by name", function () {
    expect(greet("Ana")).toBe("Hello, Ana!");
  });
  it("should greet a different name", function () {
    expect(greet("Luis")).toBe("Hello, Luis!");
  });
  it("should handle empty string", function () {
    expect(greet("")).toBe("Hello, !");
  });
});

describe("Challenge 2: getType", function () {
  it("should return 'number' for numbers", function () {
    expect(getType(42)).toBe("number");
  });
  it("should return 'string' for strings", function () {
    expect(getType("hello")).toBe("string");
  });
  it("should return 'boolean' for booleans", function () {
    expect(getType(true)).toBe("boolean");
  });
  it("should return 'undefined' for undefined", function () {
    expect(getType(undefined)).toBe("undefined");
  });
});

describe("Challenge 3: toNumber", function () {
  it("should convert '42' to 42", function () {
    expect(toNumber("42")).toBe(42);
  });
  it("should convert '3.14' to 3.14", function () {
    expect(toNumber("3.14")).toBeCloseTo(3.14);
  });
  it("should convert negative strings", function () {
    expect(toNumber("-10")).toBe(-10);
  });
});

describe("Challenge 4: isEven", function () {
  it("should return true for 4", function () {
    expect(isEven(4)).toBe(true);
  });
  it("should return false for 7", function () {
    expect(isEven(7)).toBe(false);
  });
  it("should return true for 0", function () {
    expect(isEven(0)).toBe(true);
  });
  it("should handle negative numbers", function () {
    expect(isEven(-6)).toBe(true);
  });
});

describe("Challenge 5: getFullName", function () {
  it("should combine first and last name", function () {
    expect(getFullName("Ana", "Garcia")).toBe("Ana Garcia");
  });
  it("should work with different names", function () {
    expect(getFullName("Luis", "Martinez")).toBe("Luis Martinez");
  });
});

describe('Challenge 6: appendToString', function () {
  it('returns a string with appended characters', function() {
    expect(appendToString('Hello', ' World!')).toBe('Hello World!');
  });
  it('returns a string with appended characters', () => {
    expect(appendToString('Foo', 'bar')).toBe('Foobar');
    expect(appendToString('bar', 'Foo')).toBe('barFoo');
    expect(appendToString('', 'test')).toBe('test');
    expect(appendToString('other test', '')).toBe('other test');
  });
});
describe('Challenge 7: charAt', function () {
  it('returns a character at position string', function() {
    expect(charAt('awesome', 2)).toBe('e');
    expect(charAt('awesome', 12)).toBe('');
  });
});
describe('Challenge 8: isVowel', function () {
  it('returns true if character is a vowel, false if it is a consonant', function() {
    expect(isVowel('a')).toBe(true);
    expect(isVowel('w')).toBe(false);
  });
});
describe('Challenge 9: isAlt', function () {
  it('returns a boolean whether the vowels and consonant are alternate', function() {
    expect(isAlt('amazon')).toBe(true); // true
    expect(isAlt('apple' )).toBe(false); // false
    expect(isAlt('banana')).toBe(true); // true
  });
});
describe('Challenge 10: removeVowels', function () {
  it('return a new string with all the vowels removed. ', function() {
    expect(removeVowels('Hello!')).toBe("Hll!")
    expect(removeVowels('Tomatoes')).toBe("Tmts")
    expect(removeVowels('Reverse Vowels In The String')).toBe("Rvrs Vwls n Th Strng")
    expect(removeVowels('aeiou')).toBe("")
    expect(removeVowels('why try, shy fly?')).toBe("why try, shy fly?")
  });
});


