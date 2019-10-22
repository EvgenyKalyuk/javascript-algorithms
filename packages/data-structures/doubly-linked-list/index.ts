import Comparator from '@javascript-algorithms/utils/comparator';

import DoublyLinkedListNode from './doubly-linked-list-node';

type FindArgs<Value> = {
    value: Value,
    callback?: (value: Value) => boolean
}

export default class DoublyLinkedList<Value> {
    public head: DoublyLinkedListNode<Value> | null;
    public tail: DoublyLinkedListNode<Value> | null;
    private comparator: Comparator<Value, Value>;

    constructor(comparatorFunction?: (a: any, b: any) => number) {
        this.comparator = new Comparator<Value, Value>(comparatorFunction);
        this.tail = null;
        this.head = null;
    }

    public prepend(value: Value): DoublyLinkedList<Value> {
        const newNode = new DoublyLinkedListNode<Value>(value);

        if (this.head) {
            this.head.previous = this.head;
        }

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    public append(value: Value): DoublyLinkedList<Value> {
        const newNode = new DoublyLinkedListNode<Value>(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail!.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        return this;
    }

    public delete(value: Value): DoublyLinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode: DoublyLinkedListNode<Value> | null = this.head;

        while(currentNode) {
            if (this.comparator.equal(currentNode.value, value)) {
                deletedNode = currentNode;

                if (deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }

                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    this.tail = deletedNode.previous;

                    if (this.tail) {
                        this.tail.next = null;
                    }
                } else {
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;

                    previousNode!.next = nextNode;
                    nextNode!.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    public find({ value, callback }: FindArgs<Value>): DoublyLinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        let currentNode: DoublyLinkedListNode<Value> | null = this.head;

        while(currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value && this.comparator.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    public deleteTail(): DoublyLinkedListNode<Value> | null {
        if (!this.tail) {
            return null;
        }

        const deletedNode = this.tail;

        if (this.tail === this.head) {
            this.tail = null;
            this.head = null;

            return deletedNode;
        }

        this.tail = this.tail!.previous;
        this.tail!.next = null;

        return deletedNode;
    }

    public deleteHead(): DoublyLinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        const deletedNode: DoublyLinkedListNode<Value> = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    public toArray(): Array<DoublyLinkedListNode<Value>> {
        const nodes = [];

        let currentNode = this.head;

        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    public fromArray(value: Array<Value>): DoublyLinkedList<Value> {
        value.forEach(value => this.append(value));

        return this;
    }

    public toString(callback: (value: Value) => string): string {
        return this.toArray()
            .map(value => value.toString(callback))
            .toString();
    }

    public reverse(): DoublyLinkedList<Value> {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currentNode) {
            nextNode = currentNode.next;
            prevNode = currentNode.previous;

            currentNode.next = prevNode;
            currentNode.previous = nextNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}