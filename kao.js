"use strict";
var inputs = Array.from(document.querySelectorAll(".inputs a"));
var textarea = document.querySelector("textarea");
for(let el of inputs){
    el.addEventListener("click", function(){
        textarea.value += el.innerText;
    });
}

var copy = document.querySelector("button");
copy.addEventListener("click", function(){
    textarea.select();
    document.execCommand("copy");
});
