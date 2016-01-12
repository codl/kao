"use strict";
var inputs = Array.from(document.querySelectorAll(".inputs a"));
var textarea = document.querySelector("textarea");
function makeMoji(el){
    el.addEventListener("click", function(){
        if("selectionStart" in textarea){
            let start = textarea.selectionStart;
            let end = textarea.selectionEnd;
            let left = textarea.value.slice(0, start);
            let right = textarea.value.slice(end);
            textarea.value = left + el.textContent + right;
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
        else {
            textarea.value += el.textContent;
        }
    });
}
for(var el of inputs){
    makeMoji(el);
}

var copy = document.querySelector("button");
copy.addEventListener("click", function(){
    textarea.select();
    document.execCommand("copy");
});
