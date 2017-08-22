/**
 * Created by jsbfec on 17/3/28.
 */
$(function () {
    var $form = $("#duijie");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
        ,
        fields: {
            'aptitude': {
                validators: {
                    notEmpty: {
                        message: '请上传企业资质'
                    },
                    regexp: {
                        regexp: /.(jpg|jpeg|png|doc|docx|pdf)$/,
                        message: '文件格式仅限jpg,jpeg,png,doc,docx,pdf'
                    }
                }
            },
            'technology': {
                validators: {
                    notEmpty: {
                        message: '请上传技术方案'
                    },
                    regexp: {
                        regexp: /.(jpg|jpeg|png|doc|docx|pdf)$/,
                        message: '文件格式仅限jpg,jpeg,png,doc,docx,pdf'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {//点击提交之后
        e.preventDefault();

        var data = $form.serialize();

        $form.ajaxSubmit({
            type: 'POST',
            url: $form[0].action,
            dataType: 'json',
            data: data,
            contentType: false,
            cache: false,
            processData: false,

            beforeSubmit: function () {
                //上传之前的处理
            },
            uploadProgress: function (event, position, total, percentComplete) {
                //在这里控制进度条
            },
            success: function (res) {
                console.log(res);
                var resJ = res;
                modalx(resJ.message);
                if (resJ.status != 200) {
                    $form.find('button[type="submit"]').prop('disabled', false);
                }else{
                    $('.modal-duijie').modal('hide');
                }
            },
            error: function (data) {
                console.log('保存出错');
            }
        });
    });

    $('.js-duijie').on('click', function () {
        $('.modal-duijie').modal('show');
    });

    var modalZX = '<div class="modal fade modal-zixun" tabindex="-1" role="dialog">'
        + '<div class="modal-dialog" role="document">'
        + '<div class="modal-content">'
        + '<div class="close-bottom" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></div>'
        + '<img src="" class="img-100">'
        + '<div class="text-center img-txt">微信扫一扫</div>'
        + '</div></div></div>';

    $(document).on('click', '.js-zixun-zhuanjia', function () {
        var $this = $(this);
        var imgurl = $this.data('img');
        var $modal = $(".modal-zixun");
        if ($modal.length > 0) {
            $modal.remove();
        } else {
            $(modalZX).appendTo("body");
            var $modal = $(".modal-zixun");
        }

        $modal.find('img').attr('src', imgurl);
        $modal.modal('show');
    });


});
