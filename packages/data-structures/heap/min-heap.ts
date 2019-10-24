import Heap from './index';

export default class MinHeap<Value> extends Heap<Value> {
    protected pairIsInCorrectOrder(firstElement: Value | void, secondElement: Value | void): boolean {
        return this.comparator.lessThanOrEqual(firstElement, secondElement)
    }
}