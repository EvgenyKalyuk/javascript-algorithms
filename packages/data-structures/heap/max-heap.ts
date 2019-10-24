import Heap from './index';

export default class MaxHeap<Value> extends Heap<Value> {
    protected pairIsInCorrectOrder(firstElement: Value | void, secondElement: Value | void) {
        return this.comparator.greaterThanOrEqual(firstElement, secondElement);
    }
}