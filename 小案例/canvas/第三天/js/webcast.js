/**
 * Created by Administrator on 2018/10/21.
 */
function CircText(option){
    this._init( option );
}

CircText.prototype = {
    _init : function ( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;
        this.text = option.text || 'canvas';
        this.innerStyle = option.innerStyle || 'red';
        this.outerStyle = option.outerStyle || 'blue';


        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });

        // 初始化一个内部圆
        var innerCircle = new Konva.Circle({
            x : 0,
            y : 0,
            radius : this.innerRadius,
            opacity : .8,
            fill : this.innerStyle
        });

        this.group.add( innerCircle );

        // 初始化一个圆环

        var outerRing = new Konva.Ring({
            x : 0,
            y : 0,
            innerRadius : this.innerRadius,
            outerRadius : this.outerRadius,
            fill : this.outerStyle,
            opacity : .3
        });

        this.group.add( outerRing );

        var text = new Konva.Text({
            x: 0 - this.outerRadius,
            y: -7,
            width: this.outerRadius * 2,//文字的宽度
            fill: '#fff',			    //文字的颜色
            fontSize: 17,				//文字的大小
            text: this.text,			//文字的内容
            align: 'center',			//居中显示
            fontStyle: 'bold'
        });

        this.group.add( text );
        
    },
    addToGroupOrLayer : function ( org ) {
        org.add( this.group );
    }
};