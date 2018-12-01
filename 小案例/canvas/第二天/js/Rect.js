/**
 * Created by Administrator on 2018/10/18.
 */
function Rect(  option ){
    this._init(option);
}
Rect.prototype = {
    _init: function ( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.h = option.h || 0;
        this.w = option.w || 0;
        this.rotation = option.rotation || 0;
        // this.rotation = option.rotation || 0;
        this.opacity = option.opacity === 0 ? 0 : option.opacity || 1;

        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;

        this.strokeStyle = option.strokeStyle || 'red';
        this.fillStyle = option.fillStyle || 'blue';
    },
    render : function ( ctx ) {
        ctx.beginPath();
        ctx.save();
        ctx.scale(this.scaleX, this.scaleY);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180 );
        ctx.globalAlpha = this.opacity;
        // 先设置后属性后再画矩形
        ctx.rect(0, 0, this.w, this.h);

        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
};



