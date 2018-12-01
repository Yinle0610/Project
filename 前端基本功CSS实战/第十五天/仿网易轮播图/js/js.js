/**
 * Created by Administrator on 2018/07/12.
 */
window.onload = function () {
    var box = $("box");
    var img = $("head_main");
    var imgs = img.children;
    var bottom = $("btm");
    //var spans = bottom.children;

    for(var i=0;i<imgs.length;i++){
        var span = document.createElement("span");
        span.className = "bottom-con";
        span.innerHTML = imgs.length-i;
        bottom.insertBefore(span,bottom.children[1]);
    }
    var spans = bottom.children;
    spans[1].setAttribute("class","bottom-con current");

    var scrollWidth = box.clientWidth ;
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.left = scrollWidth+"px";
    }
    // 遍历三个按钮
    var key = 0; // 控制播放的第几张
    for (var k in spans){
        spans[k].onclick = function () {
            if(this.className == "left"){
                animate(imgs[key],{left: scrollWidth});
                --key<0 ? key = imgs.length - 1: key;
                imgs[key].style.left = -scrollWidth + "px";
                animate(imgs[key],{left:0});
                setSquare();
            }
            else if(this.className == "right"){
               //  alert("右边的按钮");
                autoplay();
            }
            else{
                // alert("下面的按钮");
                var that = this.innerHTML - 1;

                if(that > key){
                    animate(imgs[key],{left: - scrollWidth});
                    imgs[that].style.left = scrollWidth + "px";
                    animate(imgs[that],{left:0});
                }
                else if(that < key){
                    animate(imgs[key],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                    animate(imgs[that],{left:0});
                }
                key = that;
                animate(imgs[key],{left:0});
                setSquare();
           }
        }
    }
        function setSquare(){
            for( var i=1;i<spans.length-1;i++){
                spans[i].className = "bottom-con";
            }
            spans[key + 1].className = "bottom-con current";
        }
        var timer = null ;
        timer = setInterval(autoplay,2000);
        function autoplay(){
            animate(imgs[key],{left:- scrollWidth});
            ++key>imgs.length-1 ? key = 0: key;
            imgs[key].style.left = scrollWidth + "px";
            animate(imgs[key],{left: 0});
            setSquare();
            }
        box.onmouseover = function(){
            clearInterval(timer);
        }
        box.onmouseout = function () {
            clearInterval(timer);
            timer = setInterval(autoplay,2000);
        }
}