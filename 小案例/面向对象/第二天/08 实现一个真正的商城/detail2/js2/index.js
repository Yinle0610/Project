/**
 * Created by Administrator on 2018/10/28.
 */
/* 使用对象 搭积木 */

window.onload = function () {

    /* 绑定产品基本信息 */
    var Product1 = new Product();
        Product1.name =  'HM登山包33';
        Product1.des = '登山界的精品，你值得拥有！';
        Product1.normalPrice = 111;
        Product1.groupbuyPrice = 99;
        Product1.buySum = 200;
        Product1.price = 120;
        Product1.images = [
        {small : '../images/s11.jpg' , big : '../images/s11.jpg'},
        {small : '../images/s12.jpg' , big : '../images/s12.jpg'},
        {small : '../images/s13.jpg' , big : '../images/s13.jpg'}
    ];

    Product1.bindBasic();
    Product1.bindImage();


    /* 绑定事件 */
   /* $("#btnaddcart").click(function () {
        /!* 购物车新增一个产品 *!/
        cart.products.push(product);
        /!* 更新购物车   重新绑定购物车 *!/
        /!* 如果不封装 这里就可能产生重复代码 *!/
        cart.bindBasic();
        cart.bindList();
        $(window).scrollTop(0);
    });*/
    $('#btnaddcart').click(function(){
        /*购物车新增一个产品*/
        console.log('12222');
        cart.products.push(Product1);
        ///*更新购物车 - 重新绑定购物车*/
        /*如果不封装，这里就可能产生代码重复*/
        cart.bindBasic();
        cart.bindList();
        $(window).scrollTop(0);
    });






    /* $("#btnaddcast").click(function () {
         // 思考
         // 添加产品
         cart.products.push(product);
         // 重新绑定个数  、总价格、产品列表
         cart.bindList();
         cart.bindBasic();
         $(window).scrollTop(0);
     });*/


    /* 绑定购物车 */
    var cart = new Cart();
    cart.sum = 3;
    cart.allPrice = 2000;
    /* 假设购物车有3个产品 */
    cart.products.push(Product1);
    cart.products.push(Product1);
    cart.products.push(Product1);
    // 绑定基本信息
    cart.bindBasic();
    // 绑定购物车里面的产品列表
    cart.bindList();

};