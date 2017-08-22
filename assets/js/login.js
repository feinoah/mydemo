/**
 * Created by jsbfec on 17/6/2.
 */

/**
 *表单验证:登录
 * @param form 表单元素 jquery选择器
 *
 */
function loginGo(form) {
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
        loginx(form, formdata,'');
    });
}

/**
 *表单验证:手机验证码
 * @param form 表单元素
 *
 */
function phoneCheck(form){
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
                    //,
                    //threshold :  6 , //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
                    //remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}
                    //    url: '/sendsms',//验证地址
                    //    message: '验证码正确',//提示消息
                    //    delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                    //    type: 'POST'//请求方式
                    //}
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {
        e.preventDefault();
        var formdata = $form.serialize();
        var url=loginTurnTo();
        //console.log(url);
        loginx(form, formdata, url);
    });
}


/**
 *
 * @param form 表单元素
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
                window.location.href = loginTurnTo();
                return false
            }
            if(url!=undefined&&url!=''){
                //console.log("url to"+url);
                //setTimeout(function(){
                window.location.href = url;
                //},5000);
            }
            console.log(resJ);
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
 * 获取登录跳转的url
 * @returns {*}
 */
function loginTurnTo(){
    var url;
    var urlA = {
        "lijian": '/academe',
        "qiye": '/enterprise'
    };
    var $loginModal = $(".login-modal");
    if($loginModal.length){
        $loginModal.hasClass('lj-login-modal') ? url = urlA.lijian : url = urlA.qiye;
    }else{
        console.log('.login-model is not found');
    }
    return url;
}
