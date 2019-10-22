export default class LinkedListNode<Value> {
    value: Value;
    next: LinkedListNode<Value> | null;

    constructor(value: Value, next: LinkedListNode<Value> | null = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: (value: Value) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}