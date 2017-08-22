/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {

    var $form = $("#addDirectories");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        //live: 'submitted',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'cover': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '请上传封面'
                    },
                    callback: {
                        callback: function (value, validator) {

                                return value!='undefined'

                        },
                        message: '请上传封面'
                    }
                }
            },
            'name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 64,
                        message: '此处内容长度应该在6-64个字符范围内'
                    }
                }
            },
            'images': {
                validators: {
                    notEmpty: {
                        message: '请上传页面'
                    }
                }
            },
            'file': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '请上传PDF文件'
                    }
                }
            }
        }
    };

    $form.bootstrapValidator(validater);
    var bootstrapValidator = $form.data('bootstrapValidator');
    $(".submit").on('click', function () {
        var $file = $('#file');
        var $images = $('#images');
        var $cover = $('#cover');
        $file.val(getVal('#uploaderPdf .preview-list'));
        $images.val(getVal('#uploaderImages .preview-list'));
        $cover.val(getVal('#uploaderCover .preview-list'));

        bootstrapValidator.resetForm();
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = {
                _token: $('input[name=_token]').val(),
                name: $('input[name=name]').val(),
                images: $images.val(),
                file: $file.val(),
                cover: $cover.val()
            };
            var html = '';
            var url = $form.action;
            console.log(data);
            $.ajax({
                type: 'POST',
                url: $form[0].action,
                dataType: 'json',
                data: data,
                //contentType: false,
                //cache: false,
                success: function (res) {
                    var resJ;
                    if (typeof res == "string") {
                        resJ = $.parseJSON(res);
                        console.log('string');
                    } else {
                        resJ = res;
                        console.log('object');
                    }
                    modalx(resJ.message);
                    if (resJ.status != 200) {
                        $form.find('button[type="submit"]').prop('disabled', false);
                    } else {
                        goback();
                    }
                },
                error: function (data) {
                    console.log('提交出错');
                }
            });
        }

    });
    function getVal(elm) {
        var val = '';
        var $elm = $(elm);
        if ($elm.children().length) {
            $elm.children().each(function (i) {
                val = val + (val == '' ? '' : ',') + $(this).data('path');
            });
        }
        console.log(val);
        return val;
    }

});
