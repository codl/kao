"use strict";

var inputs = Array.from(document.querySelectorAll(".inputs a"));
var textarea = document.querySelector("textarea");
function makeMoji(el){
    el.addEventListener("click", function(){
        if("selectionStart" in textarea){
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var left = textarea.value.slice(0, start);
            var right = textarea.value.slice(end);
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(swr){
        var status = document.querySelector("p.status");
        status.innerHTML = "Ready for offline use! -ᴗ-✿";
    });
}
