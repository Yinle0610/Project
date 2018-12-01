// Histogram 柱状图
function HistogramChart( option ){

    this._init( option );
}

HistogramChart.prototype = {
    _init : function ( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0;// 柱状图的原点
        this.h = option.h || 0;// 柱状图高度
        this.w = option.w || 0;// 柱状图总宽度

        this.data = option.data || [];

        var x0 = 0;
        var y0 = 0;

        // 柱状图中所有元素的组
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });

        // 矩形组
        this.rectGroup = new Konva.Group({
            x : 0,
            y : 0
    });
        this.group.add( this.rectGroup );

        // 放百分比文字的组
        this.textPercentGroup  = new Konva.Group({
            x : 0,
            y : 0
    });
        this.group.add( this.textPercentGroup );

        // 初始化 底线
        var bsLine = new Konva.Line({
            // X轴 从八分之一开始
            // Y轴 3/4
            points: [x0, y0, x0+this.w, y0], // 要求底线按照画布的左上角进行定位
            strokeWidth: 1,
            stroke: 'lightgreen'
        });
        this.group.add( bsLine );

        var self = this; // 当前的柱状图对象
        var rectWidth = this.w / this.data.length;// 每个矩形占用的总宽度
        this.data.forEach(function (item , index) {// item:数组中元素，index是索引值
            // 根据item生成矩形
            var rect = new Konva.Rect({
                x : x0 + (1/4 + index)* rectWidth,
                y : y0 - item.value * self.h,
                width : 1/2 * rectWidth,
                height : item.value * self.h,
                fill : item.color,
                opacity : .6,
                cornerRadius : 10,    // 设置圆角
                shadowBlur: 10,		  //设置阴影的模糊级别
                shadowColor: 'black'//设置阴影的颜色
                // shadowOffsetX: 4, //设置阴影的X偏移量
                // shadowOffsetY: 4	 //设置应用的Y偏移量
            });
            self.rectGroup.add( rect );
        // 初始化百分比文字
        //初始化底部文字
        // 把百分百文字加到柱状图顶部
        var text = new Konva.Text({
            x : x0 +  index  * rectWidth,
            y : y0  - item.value * self.h - 14,
            fontSize : 14,
            text : item.value * 100 + '%',
            fill : item.color,
            width : rectWidth,
            align : 'center',
            name : 'textPercent'//设置文字的name后，可以通过类选择器进行选取。
        });
        self.textPercentGroup.add(text);

        // 把类型放到柱状图底部
        var textBottom = new Konva.Text({
            x : (1/4 + index)  * rectWidth,
            y : 0,
            fontSize : 14,
            text : item.name,
            fill : item.color,
            rotation : 30
        });
        self.group.add( textBottom );


    })
    }
    ,
    addToGroupOrLayer : function ( arg ) {
        arg.add( this.group );
    }
    ,
    playAnimate : function () {
        var self = this;
        // 让柱状图 y = y0 ,height:0
        this.rectGroup.getChildren().each(function(item, index){
            item.y(0);
            item.height(0);
            // 经过一个动画还原
            item.to({
                duration :1,
                y: - self.data[index].value * self.h,
                height : self.data[index].value * self.h
            });
        });
        this.textPercentGroup.getChildren().each(function (item , index) {
            item.y(-14);
            item.to({
                duration : 1,
                y : -self.data[index].value * self.h - 14
            })
        })
    }
};

