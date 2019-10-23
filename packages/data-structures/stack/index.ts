import LinkedList from '../linked-list';

export default class Stack<Value> {
    public linkedList: LinkedList<Value>;

    constructor() {
        this.linkedList = new LinkedList<Value>();
    }

    public isEmpty(): boolean {
        return !this.linkedList.head;
    }

    public peek(): Value | null {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head!.value;
    }

    public push(value: Value): void {
        this.linkedList.prepend(value);
    }

    public pop(): Value | null {
        const removedHead = this.linkedList.deleteHead();

        return removedHead ? removedHead.value : null;
    }

    public toArray(): Array<Value> {
        return this.linkedList
            .toArray()
            .map(node => node.value);
    }

    public toString(callback?: (value: Value) => string): string {
        return this.linkedList.toString(callback);
    }
}