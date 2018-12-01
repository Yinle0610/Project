/**
 * Created by Administrator on 2018/07/15.
 */
window.onload = function () {


function tab(obj) {
    var target = document.getElementById(obj)
    var spans = target.getElementsByTagName("span");
    var lis = target.getElementsByTagName("li");
    for (var i = 0; i < spans.length; i++) {
        spans[i].onmouseover = function (num) {
            return function () {
           for (var j = 0; j < spans.length; j++) {
                spans[j].className = "";
                lis[j].className = "";
            }
                spans[num].className = "current";
                lis[num].className = "show";
            }
        }(i);
    }
}
tab("box");
}