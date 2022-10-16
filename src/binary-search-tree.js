const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

//
//   class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

	root() {
		return this.rootNode;
	}

	add(data) {
		const newNode = new Node(data);

		if (!this.rootNode) {
			this.rootNode = newNode;
			return;
		}

		let currentNode = this.rootNode;

		while (currentNode) {
			if (newNode.data < currentNode.data) {
				if (!currentNode.left) {
					currentNode.left = newNode;
					return;
				}
				currentNode = currentNode.left;
			} else {
				if (!currentNode.right) {
					currentNode.right  = newNode;
					return;
				}
				currentNode = currentNode.right;
			}
		}
	}


	traverse(node, callback) {
		if (!node) {
			return;
		}
		if (callback) {
			callback(node);
		}
		this.traverse(node.left, callback);
		this.traverse(node.right, callback);
	}


	has(data) {
		let isDataHas = false;

		const hasFunction = (node) => {
			if (node.data === data) {
				isDataHas = true;
			}
		}
		this.traverse(this.rootNode, hasFunction)
		return isDataHas;
	}


	find(data) {
		let isDataFind = null;

		const findFunction = (node) => {
			if (node.data === data) {
				isDataFind = node;
			}
		}
		this.traverse(this.rootNode, findFunction)
		return isDataFind;
	}

	remove(/* data */) {
		throw new NotImplementedError('Not implemented');
		// remove line with error and write your code here
	}

	min() {
		let isMin = this.rootNode.data || null;

		const minFunction = (node) => {
			if (node.data < isMin) {
				isMin = node.data;
			}
		}
		this.traverse(this.rootNode, minFunction)
		return isMin;
	}

	max() {
		let isMax = this.rootNode.data || null;

		const maxFunction = (node) => {
			if (node.data > isMax) {
				isMax = node.data;
			}
		}
		this.traverse(this.rootNode, maxFunction)
		return isMax;
	}
}

module.exports = {
	BinarySearchTree
};