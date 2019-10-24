import { Comparator } from '@javascript-algorithms/utils';

export default class Heap<Value> {
    public comparator: Comparator<Value | void, Value | void>;
    private readonly heapContainer: Array<Value>;

    constructor(comparatorFunction?: (a: Value, b: Value) => number) {
        this.comparator = new Comparator<Value, Value>(comparatorFunction);
        this.heapContainer = [];
    }

    private getLeftChildIndex(parentIndex: number): number {
        return (parentIndex * 2) + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return (parentIndex * 2) + 2;
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    private hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    private hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    private leftChild(parentIndex: number): Value | void {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    private rightChild(parentIndex: number): Value | void {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    private parent(childIndex: number): Value | void {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    private swap(indexOne: number, indexTwo: number): void {
        const tmp = this.heapContainer[indexTwo];

        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    public peek(): Value | null {
        if (!this.heapContainer.length) {
            return null;
        }

        return this.heapContainer[0];
    }

    public poll(): Value | null {
        if (!this.heapContainer.length) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop() as Value;
        }

        const item = this.heapContainer[0];

        this.heapContainer[0] = this.heapContainer.pop() as Value;
        this.heapifyDown();

        return item;
    }

    public add(item: Value): Heap<Value> {
        this.heapContainer.push(item);
        this.heapifyUp();

        return this;
    }

    public remove(item: Value, comparator: Comparator<Value, Value> = this.comparator): Heap<Value> {
        const numberOfItemToRemove = this.find(item, comparator);

        numberOfItemToRemove.forEach(() => {
            const indexToRemove = this.find(item, comparator).pop() as number;

            if(indexToRemove === this.heapContainer.length - 1) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop() as Value;

                const parentItem = this.parent(indexToRemove);

                if (
                    this.hasLeftChild(indexToRemove) &&
                    (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        });

        return this;
    }

    public find(item: Value, comparator: Comparator<Value, Value> = this.comparator): Array<number> {
        const foundItemIndices: Array<number> = [];

        this.heapContainer.forEach((heapItem: Value, index: number): void => {
            if (comparator.equal(item, this.heapContainer[index])) {
                foundItemIndices.push(index);
            }
        });

        return foundItemIndices;
    }

    public isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    public toString(): string {
        return this.heapContainer.toString();
    }

    private heapifyUp(startIndex?: number): void {
        let currentIndex = startIndex || this.heapContainer.length - 1;

        while(this.hasParent(currentIndex) && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    private heapifyDown(startIndex: number = 0): void {
        let currentIndex = startIndex;
        let nextIndex: number | null = null;

        while(this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    protected pairIsInCorrectOrder(firstElement: Value | void, secondElement: Value | void): boolean {
        throw new Error(`
            You have to implement heap pair comparision method
            for ${firstElement} and ${secondElement} values.
        `);
    }
}