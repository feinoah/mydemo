/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {
    var $form = $("#sendInvitationCode");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'contact_name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 25,
                        message: '名字长度不符'
                    }
                }
            },
            'contact_mail': {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    emailAddress: {
                        message: '邮箱格式不正确'
                    }
                }
            },
            'contact_phone': {
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    },
                    regexp: {
                        regexp: /^1(3|4|5|7|8)[0-9]\d{8}$/,
                        message: '请输入正确的手机号码'
                    }
                }
            },
            'enterprise_name': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 60,
                        message: '企业名称长度不符'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {//点击提交之后
        e.preventDefault();
        var $form = $(e.target);
        $.post($form.attr('action'), $form.serialize(), function (res) {
            var resJ = $.parseJSON(res);
            var reselm = $(".res-msg");
            var html = '<h4>'
                + resJ.message + '<small class="hidden">'
                + resJ.status
                + '</small></h4>';
            reselm.html(html);
            if (resJ.status != 420 && resJ.status != 200) {
                $form.find('button[type="submit"]').prop('disabled', false);
            }
        });
    });
});
