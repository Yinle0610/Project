/**
 * Created by Administrator on 2018/10/28.
 */

function  Cart(){
    // 购物车的产品个数
    this.sum = 3;
    // 总价格
    this.price = 2000;
    // 产品列表
    this.products = [];
}

Cart.prototype = {
    // 结算 计算产品总价格
    jiesuan : function () {
        var sum = 0;
        for( var i = 0; i < this.products.length; i++){
            sum += this.products[i].groupbuyPrice;
        }
        return sum;
    },
    // 获取产品总数
    getSum : function () {
        this.sum = this.products.length;
        return this.sum;
    },
    // 绑定基本信息 : 个数 + 总价格
    bindBasic : function () {
        /* 产品个数 */
        $(".cartsum").html(this.getSum());
        /* 总价格 */
        $("#cartprice").html(this.jiesuan())
    },
    // 绑定列表
    bindList : function () {
        var str = '';
        for(var i = 0; i < this.products.length; i++){
            str += '<div class="cart_box">';
            str += '<div class="message">';
            str += '<div class="alert-close"> </div>';
            str += '<div class="alert-close"> </div>';
            str += '<div class="list_img"><img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/></div>';
            str+=' <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].groupbuyPrice+'</span></div>'
            str += '<div class="clearfix"></div>';
            str+='  <div class="clearfix"></div>';
            str += '</div>';
            str += '</div>'
        }
        $(".shopping_cart").html(str);

    }
    /*getAllPrice : function () {
        for(var i = 0; i < this.products.length; i++){
            this.allPrice += this.products[i].groupbuyPrice;
        }
        return this.allPrice;
    }*/

};