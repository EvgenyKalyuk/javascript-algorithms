import DoublyLinkedListNode from '../doubly-linked-list-node';

type Value = {
    value: number,
    key: string
}

describe('DoublyLinkedListNode', () => {
    it('should create list node with value', () => {
        const node = new DoublyLinkedListNode<number>(1);

        expect(node.value).toBe(1);
        expect(node.next).toBeNull();
        expect(node.previous).toBeNull();
    });

    it('should create list node with object as a value', () => {
        const nodeValue = { value: 1, key: 'test' };
        const node = new DoublyLinkedListNode<Value>(nodeValue);

        expect(node.value.value).toBe(1);
        expect(node.value.key).toBe('test');
        expect(node.next).toBeNull();
        expect(node.previous).toBeNull();
    });

    it('should link nodes together', () => {
        const node2 = new DoublyLinkedListNode<number>(2);
        const node1 = new DoublyLinkedListNode<number>(1, node2);
        const node3 = new DoublyLinkedListNode<number>(10, node1, node2);

        expect(node1.next).toBeDefined();
        expect(node1.previous).toBeNull();
        expect(node2.next).toBeNull();
        expect(node2.previous).toBeNull();
        expect(node3.next).toBeDefined();
        expect(node3.previous).toBeDefined();
        expect(node1.value).toBe(1);
        expect(node1.next!.value).toBe(2);
        expect(node3.next!.value).toBe(1);
        expect(node3.previous!.value).toBe(2);
    });

    it('should convert node to string', () => {
        const node = new DoublyLinkedListNode<number | string>(1);

        expect(node.toString()).toBe('1');

        node!.value = 'string value';
        expect(node.toString()).toBe('string value');
    });

    it('should convert node to string with custom stringifier', () => {
        const nodeValue = { value: 1, key: 'test' };
        const node = new DoublyLinkedListNode<Value>(nodeValue);
        const toStringCallback = (value: Value) => `value: ${value.value}, key: ${value.key}`;

        expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
    });
});