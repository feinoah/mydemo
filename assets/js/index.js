/**
 * Created by jsbfec on 17/3/21.
 */

    //banner chart


$(function () {

    //action 数组
    var fAction={
        'lijian':'/academe/passport/login',//砺剑action
        'company':'enterprise/passport/login'//企业action
    };
    //设置action
    $(".js-login").on('click', function (e) {
        var $this=$(this);
        if ($this.attr('onclick')==''){
            var $loginmodal=$(".login-modal");
            if($this.hasClass('lijian')){
                $('#login').attr('action',fAction.lijian);
                $loginmodal.removeClass('lj-login-modal qy-login-modal').addClass('lj-login-modal');
                $('.reg-link').hide();
            }
            if($this.hasClass('qiye')){
                $('#login').attr('action',fAction.company);
                $loginmodal.removeClass('lj-login-modal qy-login-modal').addClass('qy-login-modal');
                $('.reg-link').show();
            }
            $loginmodal.modal('show');

            //登录验证
            loginGo('#login');
            //手机验证码验证
            phoneCheck('#login2');
        }
    });

});


