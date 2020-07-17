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
 			
			document.getElementById("demo").innerHTML = (word + " is a palindrome. <br/> ") ;
		}
		else 
		{
			document.getElementById("demo").innerHTML = (word + " is not a palindrome. <br/> ") ;
		}
     }
}