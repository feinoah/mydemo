/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {
    //百度编辑器um
    var editor = UM.getEditor('product-detail-editor');
    if (dataA.content != '') {
        editor.setContent(dataA.content);
    }
    var $productcontent = $('#umeditor_textarea_editorValue');
    $productcontent.prop('disabled', true);//将umeditor默认添加的textare的disabled设为true,不提交此项的值
    //表单提交验证
    var $form = $("#stepsForm");
    var validater = {
        excluded: [':disabled', ':hidden','hidden', ':not(:visible)'],
        message: '输入不正确',
        //live: 'submitted',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 64,
                        message: '此处内容长度应该在6-64个字符范围内'
                    }
                }
            },
            'cid': {
                validators: {
                    notEmpty: {
                        message: '请选择分类'
                    }
                }
            },
            'region_id': {
                validators: {
                    notEmpty: {
                        message: '请选择地区'
                    }
                }
            },
            'description': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 12,
                        max: 256,
                        message: '此处内容长度应该在12-256个字符范围内'
                    }
                }
            },
            'content': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 12,
                        message: '此处内容长度至少为12个字符'
                    }
                }
            },'keywords':{
                validators: {
                    notEmpty: {
                        message: '此处不能为空,多个关键词请以英文逗号分隔'
                    }
                }
            }
        }
    };
    var validaterer = $form.bootstrapValidator(validater);
    var bootstrapValidator = $form.data('bootstrapValidator');
    $("#product-detail-editor").on('keyup', function () {
        $('#content').val(editor.getContent());
        bootstrapValidator.updateStatus('content', '').validateField('content');
    });
    $('.selected-wrapper').on('click', function () {
        setTimeout(function () {
            bootstrapValidator.updateStatus('cid', '').validateField('cid');
            bootstrapValidator.updateStatus('region_id', '').validateField('region_id');
        }, 500);

    });
    $(".submit").on('click', function () {
        $('#content').val(editor.getContent());
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = $form.serialize();
            var html = '';
            var url = $form.action;
            console.log(data);

            $.post($form[0].action, data, function (res) {
                console.log(res);
                var resJ = parseData(res);
                modalx(resJ.message);
                if (resJ.status != 200) {
                    $form.find('button[type="submit"]').prop('disabled', false);
                } else {
                    goback();
                }
                $form.find(".result-msg").html(resJ.message);
            })
        }

    })
});
