/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {
    var $form = $("#addUser");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'mail': {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    emailAddress: {
                        message: '邮箱格式不正确'
                    }
                }
            },
            'role_id': {
                validators: {
                    notEmpty: {
                        message: '请为用户选择一个角色'
                    }
                }
            },
            'password': {
                message: '密码输入不正确',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 8,
                        max: 25,
                        message: '密码的长度应该在8-25位'
                    }
                }
            },
            'real_name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '名字长度不符'
                    }
                }
            },
            'phone': {
                message: '选填项',
                validators: {
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
            'birthday': {
                validators: {
                    regexp: {
                        regexp: /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/,
                        message: '请使用格式YYYY-MM-DD(例如:2017-05-19)'
                    }
                }
            }
        }
    };
    var validater2 = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'mail': {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    emailAddress: {
                        message: '邮箱格式不正确'
                    }
                }
            },
            'role_id': {
                validators: {
                    notEmpty: {
                        message: '请为用户选择一个角色'
                    }
                }
            },
            'password': {
                message: '密码输入不正确',
                validators: {
                    stringLength: {
                        min: 8,
                        max: 25,
                        message: '密码的长度应该在8-25位'
                    }
                }
            },
            'real_name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '名字长度不符'
                    }
                }
            },
            'phone': {
                message: '选填项',
                validators: {
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
            'birthday': {
                validators: {
                    regexp: {
                        regexp: /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/,
                        message: '请使用格式YYYY-MM-DD(例如:2017-05-19)'
                    }
                }
            }
        }
    };

    if (userid) {
        formvalidator(validater2);

    } else {
        formvalidator(validater);
    }
    function formvalidator(validater) {
        $form.bootstrapValidator(validater);
        $form.bootstrapValidator(validater).on('success.form.bv', function (e) {//点击提交之后
            e.preventDefault();
            var $form = $(e.target);
            $.post($form.attr('action'), $form.serialize(), function (res) {
                console.log($form.serialize());
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
                if(resJ.status==200){
                    goback();
                }
            });
        });
    }

    $('#reset').on('click', function () {
        $form.bootstrapValidator("resetForm", true);
    })
});
