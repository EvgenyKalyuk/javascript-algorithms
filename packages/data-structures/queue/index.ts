import LinkedList from '../linked-list';

export default class Queue<Value> {
    public linkedList: LinkedList<Value>;

    constructor() {
        this.linkedList = new LinkedList<Value>();
    }

    public isEmpty(): boolean {
        return !this.linkedList.head;
    }

    public peek(): Value | null {
        if (!this.linkedList.head) {
            return null;
        }

        return this.linkedList.head.value;
    }

    public enqueue(value: Value): void {
        this.linkedList.append(value);
    }

    public dequeue(): Value | null {
        const removedHead = this.linkedList.deleteHead();

        return removedHead ? removedHead.value : null;
    }

    public toString(callback?: (value: Value) => string): string {
        return this.linkedList.toString(callback);
    }
}
