export default class LinkedListNode<Value> {
    public value: Value;
    public next: LinkedListNode<Value> | null;

    constructor(value: Value, next: LinkedListNode<Value> | null = null) {
        this.value = value;
        this.next = next;
    }

    public toString(callback?: (value: Value) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}