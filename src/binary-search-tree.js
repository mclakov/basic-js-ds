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
					currentNode.right = newNode;
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

	remove(data) {
		if (this.rootNode === null) {
			return null;
		}

		const findMinNode = (node) => {
			if (node.left === null) {
				return node;
			}
			return findMinNode(node.left);
		}


		const removeNode = (currentNode, data) => {
			if (currentNode.data === data) {
				if (currentNode.left === null && currentNode.right === null) {
					return null;
				}
				if (currentNode.left === null) {
					return currentNode.right;
				}
				if (currentNode.right === null) {
					return currentNode.left;
				}
				const minNode = findMinNode(currentNode.right);
				currentNode.data = minNode.data;
				currentNode.right = removeNode(currentNode.right,minNode.data);
				return currentNode;
			}

			if (data < currentNode.data) {
				if (currentNode.left === null) {
					return currentNode;
				}
				currentNode.left = removeNode(currentNode.left, data);
				return currentNode;
			}

			if (data > currentNode.data) {
				if (currentNode.right === null) {
					return currentNode;
				}

				currentNode.right = removeNode(currentNode.right, data);
				return currentNode;
			}
		}
		this.rootNode = removeNode(this.rootNode, data);
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