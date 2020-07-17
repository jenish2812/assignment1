class Queue 
	{
	constructor() 
		{
		this.oldestIndex = 1;
		this.newestIndex = 1;
		this.storage = {};
		}
	size() 
		{
		return this.newestIndex - this.oldestIndex;
		}
    enqueue(data) 
		{
		// creates a new key for this.storage and assigns data to it
		this.storage[this.newestIndex] = data;
		this.newestIndex++;
		}
    dequeue() 
		{
		let oldestIndex = this.oldestIndex,
		newestIndex = this.newestIndex,
		deletedData;
		// make sure data has been added to the queue in the first place before dequeueing
		if (oldestIndex !== newestIndex) 
			{
			deletedData = this.storage[oldestIndex];
			delete this.storage[oldestIndex];
			this.oldestIndex++; 
			return deletedData;
			}
		}
	}
class Node 
	{
	constructor(data) 
		{
		this.data = data;
		this.parent = null;
		this.children = [];
		}
	}
class Tree 
	{  
	constructor(data) 
		{
		this.root = new Node(data);
		}
		// DFS: goes deep into some node (and its children) before asking any neighbors. Uses a stack.
		// Step 1: Immediately invoke recurse with the root node of a tree as its argument. At this moment, currentNode points to the current node. 
		// Step 2: Enter a for loop and iterate once for each child of currentNode, beginning with the first child. 
		// Step 3: Inside the body of the for loop, invoke recurse with a child of currentNode. The exact child depends on the current iteration of the for loo
		// Step 4: When currentNode no longer has children, we exit the for loop and invoke the callback we passed during the invocation of traverseDF(callback). 
		traverseDF(callback) 
			{
			(function recurse(currentNode) 
				{
				// step 2
				for (let i = 0, length = currentNode.children.length; i < length; i++) 
					{
					// step 3
					recurse(currentNode.children[i]);
					}
					// step 4
					callback(currentNode);
					// step 1
				}
				(this.root);
			}
			// BFS: Start with the root node; then travel one depth and visit every node in that depth from left to right. Repeat this process until there are no more depths to travel. Uses a queue.
			// 1. Create an instance of Queue.
			// 2. Add the node that invoked traverseBF(callback) to the instance of Queue. 
			// 3. Declare a variable named currentNode and initialize it to the node we just added to our queue. 
			// 4. While currentNode points to a node, execute the code inside the while loop. 
			// 5. Use a for loop to iterate on the children of currentNode.
			// 6. Inside the body of the for loop, add every child to the queue. 
			// 7. Take currentNode and pass it as an argument of callback. 
			// 8. Reassign currentNode to the node being removed from the queue. 
			// 9. Until currentNode does not point to a node—every node in the tree has been visited—repeat steps 4 to 8.
		traverseBF(callback) 
			{
			// Step 1
			let queue = new Queue();
			// Step 2
			queue.enqueue(this.root);
			// Step 3
			let currentNode = queue.dequeue();
			// Step 4, Step 9
			while (currentNode) 
				{
				// Step 5
				for (let i = 0, length = currentNode.children.length; i < length; i++) 
				{
				// Step 6
        queue.enqueue(currentNode.children[i]);
      }
      
      // Step 7
      callback(currentNode);
      // Step 8
      currentNode = queue.dequeue();
    }
  }
  
  // searches for a particular value in the tree
  contains(callback, traversal) {
    traversal.call(this, callback);
  }
  
  // add a node (data) as a child to a specific parent node (toData) by finding the parentNode in the tree with DFS or BFS (traversal)
  add(data, toData, traversal) {
    let child = new Node(data),
        parent = null,
        callback = function(node) {
          if (node.data === toData) {
            parent = node;
          }
        };
    
    // looks to see if parent exists in the tree
    this.contains(callback, traversal);
    
    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add node to a nonexistent parent.');
    }
  }
  
  // removes a child node and its children (data) from its parent node (fromData)
  remove(data, fromData, traversal) {
    // If any of the nodes in parent.children contain a value that matches data, the variable index is assigned an integer. If none of the children's data property values match data, then index retains its default value of undefined.
    function findIndex(arr, data) {
      let index;
      
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].data === data) {
          index = i;
        }
      }
      
      return index;
    }
    
    let tree = this,
        parent = null,
        childToRemove = null,
        index;
        
    let callback = function(node) {
      if (node.data === fromData) {
        parent = node;
      }
    };
    
    // traverse the tree to find the parent node
    this.contains(callback, traversal);
    
    if (parent) {
      index = findIndex(parent.children, data);
      
      if (index === undefined) {
        throw new Error('Node to remove does not exist.');
      } else {
        childToRemove = parent.children.splice(index, 1);
      }
    } else {
      throw new Error('Parent does not exist.');
    }
    
    return childToRemove;
  }
  
}

// Build up a tree
var tree = new Tree('CEO');
 
tree.add('VP of Happiness', 'CEO', tree.traverseBF);
tree.add('VP of Finance', 'CEO', tree.traverseBF);
tree.add('VP of Sadness', 'CEO', tree.traverseBF);
 
tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF);
 
/*
 
 tree
 
 'CEO'
 ├── 'VP of Happiness'
 ├── 'VP of Finance'
 │   ├── 'Director of Puppies'
 │   └── 'Manager of Puppies'
 └── 'VP of Sadness'
 
*/

// testing DFS method
tree.traverseDF(function(node) {
  console.log('DFS:', node.data);
});

// testing BFS method
console.log('\n');
tree.traverseBF(function(node) {
  console.log('BFS:', node.data);
});

// testing contains method
tree.contains(function(node) {
  if (node.data === 'VP of Happiness') {
    console.log('\n' + 'Tree contains node:', node);
  }
}, tree.traverseBF);

// testing remove method
tree.remove('VP of Happiness', 'CEO', tree.traverseBF);
console.log('\n' + "VP of Happiness removed! Root's children are now:", tree.root.children);