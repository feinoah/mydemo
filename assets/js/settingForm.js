/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {
    var $form = $("#settings");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        }
    };



    formvalidator(validater);

    function formvalidator(validater) {
        $form.bootstrapValidator(validater);
        $form.bootstrapValidator(validater).on('success.form.bv', function (e) {//点击提交之后
            e.preventDefault();

            $.post($form.attr('action'), $form.serialize(), function (res) {

                var resJ = $.parseJSON(res);
                modalx(resJ.message);

                $form.find('button[type="submit"]').prop('disabled', false);

                if(resJ.status==200){
                    //goback();
                    //modalx('保存成功');
                }
            });
        });
    }

    $('#reset').on('click', function () {
        $form.bootstrapValidator("resetForm", true);
    })
});
