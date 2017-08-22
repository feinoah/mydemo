/**
 * Created by jsbfec on 17/4/1.
 */


/**
 * 重设modal位置,常用于删除等操作的modal提示
 * @param modal
 * @param target  触发modal的元素
 */
function modalRePosition(modal, target) {
    var top = $(target).offset().top;
    var height = 200;
    var trheight = 50;
    var result = (top - height) < 0 ? (top + trheight) : (top - height);
    var $modal = $(modal);
    $modal.find('.modal-dialog').css('marginTop', result + 'px');
    $modal.modal('show');
}
/**
 * modal提示信息
 * @param msg 提示信息的内容
 */
function modalx(msg) {
    var $msgmodal = $('.msg-modal');
    if ($msgmodal.length) {
        $msgmodal.remove();
    }
    var msghtml = '<div class="modal fade msg-modal" tabindex="-1">'
        + '<div class="modal-dialog modal-lg" role="document">'
        + '<div class="modal-content"><div class="text-center">'
        + msg
        + '</div></div>'
        + '</div>'
        + '</div>';
    $msgmodal = $(msghtml);
    $msgmodal.modal('show');
    setTimeout(function () {
        $msgmodal.modal('hide');
    }, 3000);
}
/**
 * 倒计时
 * @param elm
 * @param time
 */
function daojishi(elm, time) {
    var timer = null;
    var startDate = new Date();
    var startTime = startDate.getTime();
    var nowTime, timeCha;
    var _time = time;
    var $elm = $(elm);
    var originalText = $elm.text();
    $elm.prop('disabled', true).text(_time + 's');
    function running() {
        var nowDate = new Date();
        nowTime = nowDate.getTime();
        timeCha = _time - Math.floor((nowTime - startTime) / 1000);
        if (timeCha >= 0) {
            $elm.text(timeCha + 's');
        } else {
            clearInterval(timer);
            $elm.prop('disabled', false).text(originalText);
            return;
        }
    }

    timer = setInterval(running, 1000);
}

/**
 *下拉框分类选择器
 * @param elm 父容器
 * @param api api接口
 * @param inputelm 结果载体
 * @param cats 编辑时以获取的分类
 * 此方通过本身id获取子类.
 */
function setCats(elm, api, inputelm, cats) {

    var $elm = $(elm);
    var $select = $elm.find('.selected-wrapper');
    var _api = api;
    var $inputelm = $(inputelm);
    var $cover = $elm.find('.select-cover');
    if (cats != undefined) {
        var data = cats;
        if (data.length) {
            var txt = '';
            for (var i = 0; i < data.length; i++) {
                txt = txt + (i == 0 ? '' : '>>') + data[i];
            }
            $elm.find('option:first').text(txt);
        }
    }

    $.getJSON(_api, function (data) {
        var html = '<ul class="select-list">';
        var arr = data.data;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].level == 1) {
                html = html + '<li class="item" data-name="' + arr[i].name + '" data-cid="' + arr[i].id + '" data-parent="' + arr[i].parent_id + '" data-level="1">' + arr[i].name +
                    '</li>';
            }
        }
        html = html + '</ul>';
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
        $.getJSON(api, function (data) {
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
                return
            }
            html = html + '</ul>';
            $elm.find('.select-list:gt(' + (indexP) + ')').remove();

            $select.append(html);
        });

    });
}
/**
 * 获取当前日期 年月日
 * @param fengefu   分隔符
 * @returns {*}     返回处理后当前的年月日
 */
function getNowDate(fengefu) {
    var nowDate = new Date();
    var yy = nowDate.getFullYear();
    var mm = nowDate.getMonth() + 1;
    var dd = nowDate.getDate();
    return yy + fengefu + mm + fengefu + dd;
}


/**
 * 返回上一页
 */
function goback() {
    history.go(-1);
}
/**
 *删除确认
 * @param options  删除按钮默认js-delete
 */
function delConfirmModal(options) {
    var defaults = {
        elm: '.js-delete' ,
        parent:'tr',
        className:'warning'
    };
    var opts=$.extend({},defaults,options);
    var modal = '<div class="modal fade js-del-modal" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close js-cancel" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title">删除提示</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>请再次确认是否要执行删除操作</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a href="#" class="btn btn-default js-enter">确认</a>' +
        '<button type="button" class="btn btn-primary js-cancel" data-dismiss="modal">取消</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $modal = $('js-del-modal');
    if ($modal.length) {
        $modal.remove();
    }

    if ($(opts.elm).length) {
        $('body').append(modal);
        $(document).on('click', opts.elm, function (e) {
            e.preventDefault();
            var $this = $(this);
            var url = $this.attr('href');
            $this.parents(opts.parent).addClass(opts.className);
            modalRePosition('.js-del-modal', this);
            $('.js-enter').attr('href', url);
        });
        $(document).on('click', '.js-cancel', function () {
            $(opts.parent).removeClass(opts.className);
        });
    } else {
        console.log(opts.elm + ' is not found');
    }

}
/**
 * 接口返回的数据类型不定,可能为对象,可能为字符串
 * @param data
 * @returns {*}
 */
function parseData(data) {

    if (typeof(data) === 'string') {

        return $.parseJSON(data);
    } else {

        return data;
    }
}
