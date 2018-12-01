/**
 * Created by Administrator on 2018/10/23.
 */
// Pie 饼状
function PieChart( option ){
    this._init( option );
}

PieChart.prototype = {
    _init : function ( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.r = option.r || 0;
        this.data = option.data || [];

         // 饼状图所有物件的组
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });

        // 饼状图所有扇形的组
        this.wedgeGroup = new Konva.Group({
            x : 0,
            y : 0
        });

        // 饼状图所有文字的组
        this.textGroup = new Konva.Group({
            x : 0,
            y : 0
        });

        this.group.add( this.wedgeGroup );
        this.group.add( this.textGroup );

        var tempAngle = -90;
        var self = this;
        this.data.forEach(function (item , index) {
            // 把每条数据创建成一个扇形
            var angle = 360 * item.value; // 当前扇形的角度
            var wedge = new Konva.Wedge({
                x: 0,		//扇形圆心坐标
                y: 0,
                angle: angle ,	//扇形的角度
                radius: self.r,	//扇形的半径
                fill: item.color,	//扇形的填充颜色
                rotation: tempAngle //扇形的旋转角度
            });
            self.wedgeGroup.add( wedge );
            // 绘制文本的 角度
            var textAngle = tempAngle + 1/2 * angle;
            // 百分比文字
            var text = new Konva.Text({
                x: (self.r+20) * Math.cos(Math.PI/ 180 * textAngle ),
                y: (self.r+20) * Math.sin(Math.PI/ 180 * textAngle ),
                text: item.value*100 +'%',
                fill : item.color
            });
            //根据角度判断设置文字的 位置
            if(  textAngle > 90 && textAngle < 270 ) {
                //让文本向左边 移动文字宽度的位置。
                text.x( text.x() - text.getWidth() );
            }
            self.textGroup.add( text );
            tempAngle += angle;

        });


        // 绘制圆环的线
        var cir = new Konva.Circle({
            x : 0,
            y : 0,
            stroke : '#ccc',
            strokeWidth : 2,
            radius : this.r + 10
        });
        this.group.add( cir );

        this._animateIndex = 0;
    }
    ,
    playAnimate : function () {

        if( this._animateIndex == 0 ) {
            // 拿到所有的扇形
            this.wedgeGroup.getChildren().each(function (item, index) {
                item.angle(0);
            });

        }
        var self = this;
            // 展示当前索引对应的动画
        var item = this.wedgeGroup.getChildren()[this._animateIndex];
        item.to({
            angle : this.data[this._animateIndex].value * 360,
            duration : 2 * this.data[this._animateIndex].value,
            onFinish : function () {
                self._animateIndex ++;
                if( self._animateIndex >= self.data.length){
                    self._animateIndex = 0; // 让他的索引清零
                    return;
                }
                self.playAnimate();
            }
        })

    }
    ,
    addToGroupOrLayer : function ( arg ) {
        arg.add( this.group )
    }
};