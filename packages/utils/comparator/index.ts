type DefaultArgType = string | number;

export default class Comparator<A = DefaultArgType, B = DefaultArgType> {
    compare: Function;

    constructor(compareFunction?: (a: A, b: B) => number) {
        this.compare = compareFunction || this.defaultCompareFunction;
    }

    defaultCompareFunction(a: DefaultArgType, b: DefaultArgType): number {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }

    equal(a: A, b: B): boolean {
        return this.compare(a, b) === 0;
    }

    lessThan(a: A, b: B): boolean {
        return this.compare(a, b) < 0;
    }

    greaterThan(a: A, b: B): boolean {
        return this.compare(a, b) > 0;
    }

    lessThanOrEqual(a: A, b: B): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    greaterThanOrEqual(a: A, b: B): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }
}