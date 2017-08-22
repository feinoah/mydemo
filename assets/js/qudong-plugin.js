/**
 * Created by jsb on 2017/5/30.
 */
;(function ($, window, document, undefined) {
    var Qudong = function (elm, options) {
        this.$elm = $(elm);
        this.defaults = {
            timerA: [],
            timer1: null,
            timer2: null,
            newHtml: '<div class="new-elm table-div">' +
            '<div class="new-item left"></div>' +
            '<div class="new-item right tbody">' +
            '</div></div>',
            loadHtml: '<div class="preloader-box">'
            + '<div class="line-scale-pulse-out"> <div></div> <div></div> <div></div> <div></div> <div></div> </div>'
            //+ '<div class="ball-pulse"><div></div><div></div><div></div></div>'
            //+ '<div class="preloader"></div>'
            + '<div class="qiyin-msg">可驱动的需求</div>'
            + '</div>',
            reqUrl: '/xuqiu/traction'
        };
        this.opts = $.extend({}, this.defaults, this.options);
    };
    Qudong.prototype = {
        init: function () {
            var _self = this;
            var _opts = _self.opts;
            _self.$elm.append(_opts.newHtml);
            _self.onProductsEvents();
            _self.onNewelmEvents();
        },
        onProductsEvents: function () {
            var _self = this;
            var opts = _self.opts;
            var data=opts.reqUrl;
            var events = {
                'mouseenter': function () {
                    //清除所有计时器
                    _self.clearTimerA(opts.timerA);
                    opts.timerA = [];


                    var $this = $(this);
                    var html = $this.html();
                    var loadhtml = opts.loadHtml;
                    var $elm = _self.$elm;
                    var $newelm = $elm.children('.new-elm');
                    var cid=$this.data('cid');
                    var keywords=$this.data('keys');
                    //清空style
                    $newelm.attr('style', '');
                    $elm.children('.new-item').attr('style', '').html('');

                    var thisopt = {
                        "height": $this.outerHeight(),
                        "width": $this.outerWidth(),
                        "top": $this.position().top,
                        "left": $this.position().left,
                        "allwidth": $this.parent().outerWidth()
                    };
                    var chawidth = thisopt.allwidth - thisopt.width;

                    opts.timer1 = setTimeout(function () {
                        $newelm.css({
                            'height': thisopt.height + 'px',
                            'top': thisopt.top + 'px',
                            'opacity': 1,
                            'zIndex': 99
                        });
                        $newelm.find('.new-item:first').html(html).css({
                            'width': thisopt.width + 'px',
                            'height': thisopt.height + 'px',
                            'left': thisopt.left + 'px',
                            'opacity': 0,
                            'zIndex': 99
                        }).stop().animate({
                            opacity: 1,
                            left: 0
                        }, 800);

                        $newelm.find('.new-item:last').css({
                            'width': chawidth + 'px',
                            'height': thisopt.height + 'px',
                            'left': thisopt.width + 'px',
                            'opacity': 0,
                            'zIndex': 99
                        }).stop().animate({
                            opacity: 1
                        }, 800);
                        $elm.find('.tbody').html(loadhtml);

                        opts.timer2 = setTimeout(function () {

                            getXQ({elm:$newelm,cid:cid,keywords:keywords});
                        }, 1500);
                        opts.timerA.push(opts.timer2);
                    }, 800);
                    console.log('in timer1:' + opts.timer1);
                    opts.timerA.push(opts.timer1);
                },
                'mouseleave': function () {
                    //只清除timer1
                    console.log('leave clear timer1:' + opts.timer1);
                    clearTimeout(opts.timer1);
                }
            };
            _self.$elm.on(events, '.item');
        },
        onNewelmEvents: function () {
            var _self = this;
            var opts = _self.opts;
            var events = {
                //'mouseenter':function(){
                //},
                'mouseleave': function () {
                    console.log('out:' + opts.timerA);
                    _self.clearTimerA(opts.timerA);
                    opts.timerA = [];
                    var $this = $(this);
                    $this.attr('style', '');
                    $this.find('.new-item').attr('style', '').html('');
                }
            };
            _self.$elm.on(events, '.new-elm');
        },
        clearTimerA: function (arr) {
            var l = arr.length;
            if (l) {
                for (var i = 0; i < l; i++) {
                    clearTimeout(arr[i]);
                    console.log('clear:' + arr[i]);
                }
            }
        }
    };
    $.fn.extend ({
        quDong: function (options) {
            return this.each(function () {
                var qudong = new Qudong(this, options);
                qudong.init();
            })
        }
    });
})(jQuery, window, document);
