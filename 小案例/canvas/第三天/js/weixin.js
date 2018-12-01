/**
 * Created by Administrator on 2018/10/24.
 */
var stage = new Konva.Stage({
    container : 'container',
    width : window.innerWidth,
    height : window.innerHeight
});

var sceneBuilders = [ builderHtml5Scene, builderC3Scene, builderDemoScene];
var sceneIndex = 0;

// 上来之后执行第一个场景
sceneBuilders[0]().play();
// 构造html5场景
function  builderHtml5Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    /*var imgBg = new Konva.Image({
        image :
    })*/
    var rect = new Konva.Rect({
        x : - 100,
        y : - 100,
        fill : 'red',
        width : 100,
        height : 100
    });

    return new ItcastScene({
        name : '场景1',
        layers : [bgLayer, animateLayer, lightLayer],
        stage : stage,
        init : function () {
            // 初始化场景中所有的形状
            animateLayer.add( rect );
            this.layers.forEach(function (layer) {
                layer.draw();
            })
        },
        pre : function () {
            rect.to({
                x : 100,
                y : 100,
                duration : 1,
                scaleX : 2,
                scaleY : 2,
                opacity : .4
            });
        },
        post : function (next) {
            var self = this;
            rect.to({
                x : - 100,
                y : - 100,
                duration : 1,
                scaleX : 2,
                scaleY : 2,
                opacity : .4,
                onFinish : function () {
                    self.layers.forEach(function (item) {
                        item.destroy();// 把所有层销毁
                    });
                    next();
                }
            });// 必须执行next方法，执行下一个场景的初始化和入场动画
        }
    });
}
// 构造css3场景
function  builderC3Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    /*var imgBg = new Konva.Image({
     image :
     })*/
    var rect = new Konva.Rect({
        x : - 100,
        y : - 100,
        fill : 'green',
        width : 100,
        height : 100
    });

    var data = [
        { name: '前端', value: '.8', color: 'green'},
        { name: 'PHP', value: '.3', color: 'blue'},
        { name: 'Java', value: '.7', color: 'red'},
        { name: 'UI', value: '.9', color: 'orange'},
        { name: 'IOS', value: '.4', color: 'purple'},
        { name: 'Android', value: '.9', color: 'pink'}
    ];

    var h = new HistogramChart({
        x : 1/8 * stage.width(),
        y : 3/4 * stage.height(),
        w : 3/4 * stage.width(),
        h : 1/2 * stage.height(),
        data : data
    });
    return new ItcastScene({
        name : '场景2',
        layers : [bgLayer, animateLayer, lightLayer],
        stage : stage,
        init : function () {
            // 初始化场景中所有的形状
            animateLayer.add( rect );
            h.addToGroupOrLayer( animateLayer );

            this.layers.forEach(function (layer) {
                layer.draw();
            })
        },
        pre : function () {
            rect.to({
                x : 100,
                y : 100,
                duration : 1,
                scaleX : 2,
                scaleY : 2,
                opacity : .4
            });

            h.playAnimate();
        },
        post : function (next) {
            rect.to({
                x : 100,
                y : 100,
                duration : 1,
                scaleX : 2,
                scaleY : 2,
                opacity : .4
            });
            next(); // 必须执行next方法，执行下一个场景的初始化和入场动画
        }
    })
}
// 构造demo场景
function  builderDemoScene(){
    return new ItcastScene({
    });
}

function addStageEvent() {
    var startY = 0;
    var endY = 0;
    stage.on('contentMousedown contentTouchstart' , function (e) {
        if( e.type == 'contentMousedown' ) {
            console.log(e.evt.screenX + ' ' + e.evt.screenY);
            startY = e.evt.screenY;
        }else {
            console.log(e.evt.touches[0].screenX + ' ' + e.evt.touches[0].screenY);
            startY = e.evt.touches[0].screenY;
        }

    });

    stage.on('contentMousemove contentTouchMove' , function (e) {
        if( e.type == 'contentMousemove' ){
            endY = e.evt.screenY;
            console.log( e.evt.screenY + ' ' + e.evt.screenY );
        } else{
            endY = e.evt.touches[0].screenY;
            console.log( e.evt.touches[0].screenX + ' ' + e.evt.touches[0].screenY );
        }
    });

    stage.on('contentMouseup contentTouchend' , function (e) {
        if( endY > startY){
            // 下滑  执行上一个场景的play
            sceneIndex = sceneIndex <= 0 ? 0 : sceneIndex - 1;
        }else{
            // 上滑  执行下一个场景的play
            sceneIndex = sceneIndex >= sceneBuilders.length - 1 ? sceneBuilders - 1
                : sceneIndex + 1;
        }
        sceneBuilders[ sceneIndex ]().play();
    });
}

// 给舞台添加滑动事件
addStageEvent();