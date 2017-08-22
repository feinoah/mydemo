/**
 * Created by jsbfec on 17/5/26.
 */
$(function () {
    //属性
    function setAttrs(data) {
        var html = '';
        if (data.length) {
            var arr = data;
            for (i = 0; i < arr.length; i++) {
                html = html + '<div class="form-group clearfix">' +
                    '<label for="attr' + arr[i].sort + '" class="col-xs-2 control-label">' + arr[i].name + '</label>' +
                    '<div class="col-xs-6">' +
                    '<input class="hidden" type="text" name="attributes[' + arr[i].sort + '][name]" value="' + arr[i].name + '"/>' +
                    '<input type="text" class="form-control" name="attributes[' + arr[i].sort + '][attribute]"  placeholder="" value="' + arr[i].attribute + '">' +
                    '</div>' +
                    '</div>';
            }
            $(".form-group:last").before(html);
        } else {
            $.getJSON('/enterprise/attributetemplate', function (data) {
                var arr = data.data;
                for (i = 0; i < arr.length; i++) {
                    html = html + '<div class="form-group clearfix">' +
                        '<label for="attr' + i + '" class="col-xs-2 control-label">' + arr[i] + '</label>' +
                        '<div class="col-xs-6">' +
                        '<input class="hidden" type="text" name="attributes[' + i + '][name]" value="' + arr[i] + '"/>' +
                        '<input type="text" class="form-control" name="attributes[' + i + '][attribute]"  placeholder="">' +
                        '</div>' +
                        '</div>';
                }

                $(".form-group:last").before(html);
            });
        }
    }

    //分类

    setCats('.js-cat', '/categories', '#product-cat', dataA.cate);
    //地区
    setArea('.js-area', '/enterprise/area', '#region_id', dataA.area);
    //属性

    setAttrs(dataA.attr);//attributes 来自页面

    /**
     *
     * @param elm 父容器
     * @param api api接口
     * @param inputelm 结果载体
     * @param area 编辑时获取到的area
     * 此方通过本身id获取子类.
     */

    function setArea(elm, api, inputelm, area) {
        var $elm = $(elm);
        var $select = $elm.find('.selected-wrapper');
        var catUrl = api;
        var $inputelm = $(inputelm);
        var $cover = $elm.find('.select-cover');
        var data = area;
        if (data.length) {
            var txt = '';
            for (var i = 0; i < data.length; i++) {
                txt = txt + (i == 0 ? '' : '>>') + data[i];
            }
            $elm.find('option:first').text(txt);
        }
        $.getJSON(catUrl, function (data) {
            var html = '<ul class="select-list">';
            var arr = data.data;

            for (i = 0; i < arr.length; i++) {
                if (arr[i].deep == 1) {
                    html = html + '<li class="item" data-name="' + arr[i].name + '" data-cid="' + arr[i].id + '" data-parent="' + arr[i].parent_id + '" data-deep="1">' + arr[i].name +
                        '</li>';
                }
            }
            html = html + '</ul>';
            //$(html).appendTo('.js-cat .selected-wrapper');
            $select.append(html);
        });
        $cover.on('click', function () {
            if ($select.css('display') == 'none') {
                $select.css('display', 'block');
            } else {
                $select.css('display', 'none');
            }
        });
        $select.hover(function () {
            $(this).show();
        }, function () {
            $(this).hide();
        });
        $select.on('click', '.item', function () {
            var $this = $(this);
            var $parent = $this.parent();
            var indexP = $parent.index();
            var id = $this.data('cid');
            var name = $this.text();
            $this.addClass('active').siblings().removeClass('active');
            $.getJSON(catUrl, function (data) {
                var html = '<ul class="select-list">';
                var arr = data.data;
                var hasChild = 0;
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].parent_id == id) {
                        hasChild++;
                        html = html + '<li class="item" data-name="' + $this.data('name') + '>>' + arr[i].name + '" data-cid="' + arr[i].id + '" data-parent="' + arr[i].parent_id + '" data-level="1">' + arr[i].name +
                            '</li>';
                    }
                }
                if (!hasChild) {
                    $inputelm.html($('<option value="' + id + '" selected>' + $this.data('name') + '</option>'));
                    $("input[name='cid']").trigger('select');
                    return;
                    //没有子类就返回
                }
                html = html + '</ul>';
                $elm.find('.select-list:gt(' + (indexP) + ')').remove();

                $select.append(html);
            });

        });
    }

});
