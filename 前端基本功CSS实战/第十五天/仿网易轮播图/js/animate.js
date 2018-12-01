/**
 * Created by Administrator on 2018/07/11.
 */
function $(id){return document.getElementById(id);}
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for(var attr in json) {
            var current = parseInt(getStyle(obj,attr));
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style[attr] = current + step + "px";
            if(current != json[attr]){
                flag = false;
            }
            if(flag){
                clearInterval(obj.timer);
                if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
                {
                    fn(); // 函数名 +  （）  调用函数  执行函数
                }
            }
        }
    },20)
}
function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle;
    }
    else{
        return window.getComputedStyle(obj,null)[attr];
    }
}