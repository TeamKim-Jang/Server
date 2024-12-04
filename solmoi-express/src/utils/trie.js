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
        console.log(`Trie에 삽입: ${word}`);
    }

    search(prefix) {
        console.log(`search()에서 검색 중: ${prefix}`); // 검색어 로그 추가
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
    
        console.log(`search() 결과: ${JSON.stringify(results)}`); // 결과 로그 추가
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

    // collectAllWords(node) {
    //     let results = [];
    //     if (node.isEndOfWord) {
    //         results.push(node.data);
    //     }

    //     for (let char in node.children) {
    //         results = results.concat(this.collectAllWords(node.children[char]));
    //     }
    //     return results;
    // }
}

export default Trie;
