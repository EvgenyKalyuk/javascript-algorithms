import { Comparator } from '@javascript-algorithms/utils';

import LinkedListNode from './linked-list-node';

type FindArgs<Value> = {
    value?: Value,
    callback: (value: Value) => boolean
}

export default class LinkedList<Value> {
    public head: LinkedListNode<Value> | null = null;
    public tail: LinkedListNode<Value> | null = null;
    private compare: Comparator<Value, Value>;

    constructor(comparatorFunction?: (a: any, b: any) => number) {
        this.compare = new Comparator<Value, Value>(comparatorFunction);
    }

    public prepend(value: Value): LinkedList<Value> {
        const newNode = new LinkedListNode<Value>(value, this.head);

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    public append(value: Value): LinkedList<Value> {
        const newNode = new LinkedListNode<Value>(value, this.head);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        if (this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;

        return this;
    }

    public delete(value: Value): LinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        while(this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while(currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.tail && this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    public find({ value, callback }: FindArgs<Value>): LinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        let currentNode: LinkedListNode<Value> | null = this.head;

        while(currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    public deleteTail(): LinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        const deletedTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;

        while(currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    public deleteHead(): LinkedListNode<Value> | null {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    public fromArray(value: Array<Value>): LinkedList<Value> {
        value.forEach(value => this.append(value));

        return this;
    }

    public toArray(): Array<LinkedListNode<Value>> {
        const nodes = [];

        let currentNode = this.head;

        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    public toString(callback?: (value: Value) => string): string {
        return this.toArray()
            .map(node => node.toString(callback))
            .toString()
    }

    public reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}