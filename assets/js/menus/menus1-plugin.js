/**
 * Created by jsbfec on 2017/7/17.
 */
$(function(){
    var Liandong = function (options) {
        this.defaults = {
            parent_id: 0,
            path: 0,
            url: '/assets/data/cats.json',
            sum_lv: 3,
            current_lv: 1,
            elm: '.menus'
        };
        this.opts = $.extend({}, this.defaults, options);
    };
    Liandong.prototype = {
        init: function () {
            var _self = this;
            var _opts = _self.opts;
            var path_arr = _opts.path.toString().split('_');
            var _sum_lv = _opts.sum_lv;
            var _parent_id = _opts.parent_id;
            var _current_lv = _opts.current_lv;
            var $elm=$(_opts.elm);

            $.getJSON(_opts.url, function (data) {
                var dataA = data;
                console.log('pid:' + _parent_id);
                var p = _opts.path;

                for (var l = _current_lv; l < _sum_lv + 1; l++) {
                    var html = '';
                    var arr = [];

                    for (var i = 0; i < dataA.length; i++) {
                        if (dataA[i].root_id == _parent_id) {

                            html = html + '<li class="item" data-id="' + dataA[i].cate_id + '" data-parent="' + p + '" data-level="' + l + '">' + '<a href="javascript:void(0)">' + dataA[i].cate_name + '</a>' +
                                '</li>';
                            arr.push(dataA[i]);
                        }
                    }
                    if (arr.length) {
                        $elm.eq(l - 1).html(html);
                        console.log('l:' + l);
                        _parent_id = arr[0].cate_id;
                        p = p + '_' + _parent_id;
                        console.log('parentid:' + _parent_id);
                    } else {
                        $elm.eq(l - 1).html('');
                    }
                    $elm.each(function (i) {
                        if (i >= l - 1) {
                            $(this).find('.item:first a').addClass('active');
                        }
                    });
                }

            });
        },
        getAndSetPath: function () {
//                var path = getParamValue('path');
            var path = '0_2_6_14';
            var path_arr = path.toString().split('_');
            var _self = this;
            var _opts = _self.opts;
            var $elm=$(_opts.elm);
            $.getJSON(_opts.url, function (data) {
                var dataA = data;
                var p = path_arr[0];
                for (var l = 0; l < path_arr.length + 1; l++) {
                    var html = '';
                    for (var i = 0; i < dataA.length; i++) {
                        if (dataA[i].parent_id == path_arr[l]) {
                            html = html + '<li class="item" data-id="'
                                + dataA[i].cate_id
                                + '" data-parent="'
                                + p + '" data-level="' + (l + 1)
                                + '">'
                                + '<a class="' + (path_arr[l + 1] == dataA[i].cate_id ? 'active' : "") + '" href="javascript:void(0)" >'
                                + dataA[i].cate_name + '</a>' +
                                '</li>';
                        }

                    }
                    $elm.eq(l).html(html);
                    p = p + '_' + path_arr[l + 1]
                }
            })
        }
    };
});
