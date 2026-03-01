describe("Challenge 1: getFirst", function () {
  it("should return the first element", function () {
    expect(getFirst([10, 20, 30])).toBe(10);
  });
  it("should work with strings", function () {
    expect(getFirst(["a", "b", "c"])).toBe("a");
  });
  it("should return undefined for empty array", function () {
    expect(getFirst([])).toBeUndefined();
  });
});

describe("Challenge 2: getLast", function () {
  it("should return the last element", function () {
    expect(getLast([10, 20, 30])).toBe(30);
  });
  it("should work with a single element", function () {
    expect(getLast([99])).toBe(99);
  });
  it("should return undefined for empty array", function () {
    expect(getLast([])).toBeUndefined();
  });
});

describe("Challenge 3: reverseArray", function () {
  it("should return a reversed array", function () {
    expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1]);
  });
  it("should not mutate the original", function () {
    const original = [1, 2, 3];
    reverseArray(original);
    expect(original).toEqual([1, 2, 3]);
  });
  it("should handle empty array", function () {
    expect(reverseArray([])).toEqual([]);
  });
});

describe("Challenge 4: sumAll", function () {
  it("should sum all numbers", function () {
    expect(sumAll([1, 2, 3, 4])).toBe(10);
  });
  it("should return 0 for empty array", function () {
    expect(sumAll([])).toBe(0);
  });
  it("should handle negative numbers", function () {
    expect(sumAll([-1, 5, -3])).toBe(1);
  });
});

describe("Challenge 5: includesValue", function () {
  it("should return true when value exists", function () {
    expect(includesValue([1, 2, 3], 2)).toBe(true);
  });
  it("should return false when value missing", function () {
    expect(includesValue([1, 2, 3], 9)).toBe(false);
  });
  it("should work with strings", function () {
    expect(includesValue(["a", "b"], "b")).toBe(true);
  });
});

describe("Challenge 6: removeFirst", function () {
  it("should return array without first element", function () {
    expect(removeFirst([1, 2, 3])).toEqual([2, 3]);
  });
  it("should not mutate the original", function () {
    const original = [1, 2, 3];
    removeFirst(original);
    expect(original).toEqual([1, 2, 3]);
  });
  it("should return empty array for single element", function () {
    expect(removeFirst([1])).toEqual([]);
  });
});
