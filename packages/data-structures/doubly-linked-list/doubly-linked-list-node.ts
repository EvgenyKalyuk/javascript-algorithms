export default class DoublyLinkedListNode<Value> {
    public value: Value;
    public next: DoublyLinkedListNode<Value> | null;
    public previous: DoublyLinkedListNode<Value> | null;

    constructor(value: Value, next: DoublyLinkedListNode<Value>| null = null, previous: DoublyLinkedListNode<Value>| null = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    public toString(callback?: (value: Value) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}