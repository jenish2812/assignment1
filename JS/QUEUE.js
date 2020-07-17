function Stack() {
 this.dataStore = [];
 this.top = 0;
 this.push = push;
 this.pop = pop;
 this.peek = peek;
 this.clear = clear;
 this.length = length;
}
function push(element) {
 this.dataStore[this.top++] = element;
}
function pop() {
 return this.dataStore[--this.top];
}
function peek() {
 return this.dataStore[this.top-1];
}
function clear() {
 this.top = 0;
}
function length() {
 return this.top;
}
function isPalindrome(word) {
 var s = new Stack();
 for (var i = 0; i < word.length; ++i) {
 s.push(word[i]);
 }
 var rword = "";
 while (s.length() > 0) {
 rword += s.pop();
 }
 if (word == rword) {
 return true;
 }
 else {
 return false;
 }
}
function myFunction()
{
    var txt;
    var word = prompt("Please enter your name:", "Here...");
    if (word == null || word == "") {
        txt = "User cancelled the prompt.";
    }
    else 
    {
    	if (isPalindrome(word)) 
    	{
 			
			document.getElementById("demo").innerHTML = (" Hii " + word + " !! <br/> <br/> This is QUEUE function: <br/> <br/> function Queue() <br/> { <br/> this._oldestIndex = 1; <br/> this._newestIndex = 1; <br/> this._storage = {}; <br/> } <br/> Queue.prototype.size = function() <br/> { <br/> return this._newestIndex - this._oldestIndex; <br/> }; <br/> Queue.prototype.enqueue = function(data) <br/> { <br/> this._storage[this._newestIndex] = data; <br/> this._newestIndex++; <br/> }; <br/> Queue.prototype.dequeue = function() <br/> { <br/> var oldestIndex = this._oldestIndex, <br/> var newestIndex = this._newestIndex, <br/> deletedData; <br/> if (oldestIndex !== newestIndex) <br/> { <br/> deletedData = this._storage[oldestIndex]; <br/> delete this._storage[oldestIndex]; <br/> this._oldestIndex++; <br/> return deletedData; <br/> } <br/> }; <br/> ") ;
		}
		else 
		{
			document.getElementById("demo").innerHTML = (" Hii " + word + " !! <br/> <br/> This is QUEUE function: <br/> <br/> function Queue() <br/> { <br/> this._oldestIndex = 1; <br/> this._newestIndex = 1; <br/> this._storage = {}; <br/> } <br/> Queue.prototype.size = function() <br/> { <br/> return this._newestIndex - this._oldestIndex; <br/> }; <br/> Queue.prototype.enqueue = function(data) <br/> { <br/> this._storage[this._newestIndex] = data; <br/> this._newestIndex++; <br/> }; <br/> Queue.prototype.dequeue = function() <br/> { <br/> var oldestIndex = this._oldestIndex, <br/> var newestIndex = this._newestIndex, <br/> deletedData; <br/> if (oldestIndex !== newestIndex) <br/> { <br/> deletedData = this._storage[oldestIndex]; <br/> delete this._storage[oldestIndex]; <br/> this._oldestIndex++; <br/> return deletedData; <br/> } <br/> }; <br/> ") ;
		}
     }
}