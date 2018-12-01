/**
 * Created by Administrator on 2018/10/27.
 */
// 需要哪些对象 ：产品对象

function Product(){
    // 产品名称
    this.name = '';
    /* 产品价格 */
    this.price = '';
    /* 产品图片 */
    this.image = '';
    /* 产品折扣 */
    this.zhekou = '';
}

/* 拼接时代 */
/* 豆豆加加 */
Product.prototype = {
    bindDom : function () {
        var str = '';
        str += '<dl>';
            str += '<dt><a href="javascript:;"><img src="'+this.image+'" width="384" height="225"></a> </dt>';
                str += '<dd>';
                    str += '<span>';
                        str += '<a  href="javascript:;">';
                            str += '<em>'+this.zhekou+'</em>'+ this.name +'';
                        str += '</a>';
                    str += '</span>';
                str += '</dd>';
                str += '<dd class="price">';
                    str += '<em>'+this.price+'</em>';
                    str += '<del>?198.00</del>';
                    str += '<i>销量：0天2时19分6秒</i>';
                str += '</dd>';
            str += '</dt>';
        str += '</dl>';

        return str;
    }
};

window.onload = function () {
    /* 具体和抽象  类和实例 */

    /* 实例1 */
    var product1 = new Product();
    product1.price = 118;
    product1.image = 'img/8_04744809722078624_420.jpg';
    product1.name = 'sourcel眉笔';
    /* 实例2 */
    var product2 = new Product();
    product2.price = 118;
    product2.image = 'img/8_04744809722078624_420.jpg';
    product2.name = 'sourcll眉笔';
    /* 实例3 */
    var product3 = new Product();
    product3.price = 118;
    product3.image = 'img/8_04744809722078997_420.jpg';
    product3.name = 'sourcel眉笔';
    /* 实例4 */
    var product4 = new Product();
    product4.price = 118;
    product4.image = 'img/boutque02_r2_c2.jpg';
    product4.name = '玉兰油';

    /* 思考使用什么来保存数据  -- 数组 */
    var products = [product1, product2, product3, product4];

    /* 针对单个对象整体进行编程 */
    var str = '';
    for(var i = 0; i < products.length; i++){
        str += products[i].bindDom();
    }

    var container = document.getElementById('container');
    container.innerHTML = str;
};