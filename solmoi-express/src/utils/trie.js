class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.data = null;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, data) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.data = data;
    }

    search(prefix) {
        const node = this._findNode(prefix);
        if (!node) return [];
    
        const results = [];
        const traverse = (currentNode, path) => {
          if (currentNode.isEndOfWord) {
            results.push({
              name: path.join(""),
              ...currentNode.data,
            });
          }
          for (const char in currentNode.children) {
            traverse(currentNode.children[char], [...path, char]);
          }
        };
        traverse(node, [...prefix]);
        return results;
    }
    _findNode(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }
}

export default Trie;
