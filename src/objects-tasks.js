/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 */
function shallowCopy(obj) {
  return Reflect.apply(Object.assign, Object, [{}, obj]);
}

/**
 * Merges array of objects into a single object.
 */
function mergeObjects(objects) {
  const result = {};
  objects.forEach((obj) => {
    const entries = Reflect.apply(Object.entries, Object, [obj]);
    entries.forEach(([key, value]) => {
      result[key] = (result[key] || 0) + value;
    });
  });
  return result;
}

/**
 * Removes a properties from an object.
 */
function removeProperties(obj, keys) {
  const copy = { ...obj };
  keys.forEach((key) => {
    delete copy[key];
  });
  return copy;
}

/**
 * Compares two source objects.
 */
function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
  );
}

/**
 * Checks if the source object is empty.
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable.
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters.
 */
function makeWord(lettersObject) {
  const result = [];
  Object.keys(lettersObject).forEach((letter) => {
    lettersObject[letter].forEach((pos) => {
      result[pos] = letter;
    });
  });
  return result.join('');
}

/**
 * There is a queue for tickets.
 */
function sellTickets(queue) {
  let cash25 = 0;
  let cash50 = 0;

  return queue.every((bill) => {
    if (bill === 25) {
      cash25 += 1;
    } else if (bill === 50) {
      if (cash25 === 0) return false;
      cash25 -= 1;
      cash50 += 1;
    } else if (bill === 100) {
      if (cash50 > 0 && cash25 > 0) {
        cash50 -= 1;
        cash25 -= 1;
      } else if (cash25 >= 3) {
        cash25 -= 3;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  });
}

/**
 * Returns the rectangle object.
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation.
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON.
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}

/**
 * Sorts the specified array.
 */
function sortCitiesArray(arr) {
  return [...arr].sort((a, b) => {
    if (a.country !== b.country) {
      return a.country.localeCompare(b.country);
    }
    return a.city.localeCompare(b.city);
  });
}

/**
 * Groups elements.
 */
function group(array, keySelector, valueSelector) {
  const map = new Map();
  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(value);
  });
  return map;
}

/**
 * Css selectors builder.
 */
class CssSelectorBuilder {
  constructor() {
    this.parts = [];
    this.combinations = [];
    this.elementCount = 0;
    this.idCount = 0;
    this.pseudoElementCount = 0;
    this.currentOrder = 0;
  }

  checkOrder(newOrder) {
    const message =
      'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
    if (newOrder < this.currentOrder) {
      throw new Error(message);
    }
    this.currentOrder = newOrder;
  }

  element(value) {
    if (this.elementCount > 0) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.checkOrder(1);
    this.elementCount += 1;
    this.parts.push(value);
    return this;
  }

  id(value) {
    if (this.idCount > 0) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.checkOrder(2);
    this.idCount += 1;
    this.parts.push(`#${value}`);
    return this;
  }

  class(value) {
    this.checkOrder(3);
    this.parts.push(`.${value}`);
    return this;
  }

  attr(value) {
    this.checkOrder(4);
    this.parts.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    this.checkOrder(5);
    this.parts.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    if (this.pseudoElementCount > 0) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.checkOrder(6);
    this.pseudoElementCount += 1;
    this.parts.push(`::${value}`);
    return this;
  }

  stringify() {
    const combPart = this.combinations
      .map((c) => ` ${c.combinator} ${c.selector.stringify()}`)
      .join('');
    return this.parts.join('') + combPart;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelectorBuilder().element(value);
  },
  id(value) {
    return new CssSelectorBuilder().id(value);
  },
  class(value) {
    return new CssSelectorBuilder().class(value);
  },
  attr(value) {
    return new CssSelectorBuilder().attr(value);
  },
  pseudoClass(value) {
    return new CssSelectorBuilder().pseudoClass(value);
  },
  pseudoElement(value) {
    return new CssSelectorBuilder().pseudoElement(value);
  },
  combine(selector1, combinator, selector2) {
    const combined = new CssSelectorBuilder();
    combined.parts = [...selector1.parts];
    combined.combinations = [...selector1.combinations];

    combined.combinations.push({
      combinator,
      selector: selector2,
    });

    return combined;
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
