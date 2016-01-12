"use strict";
var inputs = Array.from(document.querySelectorAll(".inputs a"));
var textarea = document.querySelector("textarea");
for(let el of inputs){
    el.addEventListener("click", function(){
        if("selectionStart" in textarea){
            let start = textarea.selectionStart;
            let end = textarea.selectionEnd;
            let left = textarea.value.slice(0, start);
            let right = textarea.value.slice(end);
            textarea.value = left + el.innerText + right;
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
        else {
            textarea.value += el.innerText;
        }
    });
}

var copy = document.querySelector("button");
copy.addEventListener("click", function(){
    textarea.select();
    document.execCommand("copy");
});
