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
    let status = document.querySelector("p.status");
    navigator.serviceWorker.register('sw.js')
    .then(function(reg){
        if(reg.installing && !reg.active){
            status.innerHTML = "Caching for offline use... ◦⋄◦";
        }
        else if(reg.installing && reg.active){
            status.innerHTML = "Updating in background... ◦⋄◦";
        }
        else if(reg.active){
            status.innerHTML = "Ready for offline use! -ᴗ-✿";
        }
    });
    navigator.serviceWorker.addEventListener('message', e => {
        if(e.data[0] == "new-version"){
            status.innerHTML = "New version installed for offline use! ☆ᴗ☆ <a href='./'>Reload</a>";
            if(textarea.value == ""){
                window.location.reload();
            }
        }
    });
}
