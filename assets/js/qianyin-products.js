/**
 * Created by jsb on 2017/5/30.
 *
 */
;$(function () {
    var timer1 = null;
    var timer2 = null;
    var trEvents = {
        "mouseenter": function () {
            clearTimeout(timer1);
            clearTimeout(timer2);
            var $this = $(this);
            var $productbox = $this.children('.js-xq-products');
            var cid=$this.data('cid');
            var keywords=$this.data('keys');
            $this.siblings().removeClass('active');
            timer1 = setTimeout(function () {
                if ($productbox.length) {
                    $productbox.remove();
                }
                $this.addClass('active');
                var html = '<div class="products-normal qianyin-products js-xq-products">'
                    + '<div class="load-qianyin">'
                    + '<div class="preloader-box">'
                    + '<div class="ball-pulse"><div></div><div></div><div></div></div>'
                        //+ '<div class="preloader"></div>'
                    + '<div class="qiyin-msg">正在牵引相关产品</div>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $this.append(html);
                timer2 = setTimeout(function () {

                    new QianyinProducts({cid:cid,keywords:keywords});

                }, 1500);
            }, 800)
        },
        "mouseleave": function () {
            var $this = $(this);
            clearTimeout(timer1);
            $this.removeClass('active');
        }
    };
    $(document).on(trEvents, '.qianyin-table .tr');

});
