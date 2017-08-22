/**
 * Created by jsbfec on 17/6/2.
 */
/**
 *表单验证:登录
 * @param form 表单元素 jquery选择器
 * @param redirect 表单元素 jquery选择器
 *
 */
function loginGo(form,redirect) {
    var $form = $(form);
    var validater = {
        message: '输入不正确',
        fields: {
            'username': {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            'password': {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {
        e.preventDefault();
        var formdata = $form.serialize();
        loginx(form, formdata,redirect);
    });
}
/**
 *表单验证:手机验证码
 * @param form 表单元素
 * @param redirect 表单元素
 *
 */
function phoneCheck(form,redirect){
    var $form=$(form);
    var validater={
        fields: {
            'code': {
                validators: {
                    notEmpty: {
                        message: '验证码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: '验证码错误'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {
        e.preventDefault();
        var formdata = $form.serialize();

        loginp(form, formdata, redirect);
    });
}

/**
 *
 * @param form 登录 表单元素
 * @param data 表单数据
 * @param url 跳转url
 *
 **/
function loginx(form, data, url) {
    var $form = $(form);
    $.post($form[0].action, data, function (res) {
        var resJ = $.parseJSON(res);
        console.log(resJ.status);
        if (resJ.status === 200) {
            if(resJ.is_check_sms!=1){
                window.location.href = url;
                return false
            }
            $form.hide();
            $('.phone').text(resJ.phone);
            $form.next().show();
        } else {
            modalx(resJ.message);
            $form.find('button[type="submit"]').prop('disabled', false);
        }
    })
}
/**
 *
 * @param form 手机 表单元素
 * @param data 表单数据
 * @param url 跳转url
 *
 **/
function loginp(form, data, url) {
    var $form = $(form);
    $.post($form[0].action, data, function (res) {
        var resJ = $.parseJSON(res);
        console.log(resJ.status);
        if (resJ.status === 200) {

            if(url!=undefined&&url!=''){

                location.href = url;

            }
        } else {
            modalx(resJ.message);
            $form.find('button[type="submit"]').prop('disabled', false);
        }
    })
}
