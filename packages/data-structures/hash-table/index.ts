import LinkedList from '../linked-list';
import LinkedListNode from '../linked-list/linked-list-node';

const defaultHashTableSize: number = 32;

type LinkedListValueType<Value> = {
    key: string,
    value: Value
};

type LinkedListType<Value> = LinkedList<LinkedListValueType<Value>>;
type LinkedListNodeType<Value> = LinkedListNode<LinkedListValueType<Value>>;

export default class HashTable<Value> {
    public buckets: Array<LinkedListType<Value>>;
    public keys: { [key: string]: number};

    constructor(hashTableSize: number = defaultHashTableSize) {
        this.buckets = Array(hashTableSize)
            .fill(null)
            .map(() => new LinkedList<LinkedListValueType<Value>>());

        this.keys = {};
    }

    public hash(key: string): number {
        const hash: number = Array
            .from(key)
            .reduce((hashAccumulator: number, keySymbol: string) => {
                return hashAccumulator + keySymbol.charCodeAt(0);
            }, 0);

        return hash % this.buckets.length;
    }

    public set(key: string, value: Value): void {
        const keyHash: number = this.hash(key);

        this.keys[key] = keyHash;

        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({
            callback: (nodeValue: LinkedListValueType<Value>) => nodeValue.key === key
        });

        if (node) {
            node.value.value = value;
        } else {
            bucketLinkedList.append({
                key,
                value
            });
        }
    }

    public delete(key: string): LinkedListNodeType<Value> | null {
        const keyHash: number = this.hash(key);

        delete this.keys[key];

        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({
            callback: (value: LinkedListValueType<Value>) => value.key === key
        });

        if (node) {
            return bucketLinkedList.delete(node.value);
        }

        return null;
    }

    public get(key: string): Value | null {
        const keyHash: number = this.hash(key);
        const bucketLinedList = this.buckets[keyHash];
        const node = bucketLinedList.find({
            callback: (value: LinkedListValueType<Value>) => value.key === key
        });

        return node ? node.value.value : null;
    };

    public has(key: string): boolean {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    public getKeys(): Array<String> {
        return Object.keys(this.keys);
    }
}