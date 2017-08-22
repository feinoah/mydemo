/**
 * Created by jsbfec on 17/5/25.
 */
$(function () {
    var $form = $("#upLoadImg");
    var upLoadImgValidaters = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'file': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    },
                    regexp: {
                        regexp: /.(gif|jpg|jpeg|png|gif|jpg|png)$/,
                        message: '图片格式仅限gif,jpg,jpeg,png,gif,jpg,png'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(upLoadImgValidaters);
    var bootstrapValidator = $form.data('bootstrapValidator');
    $(".js-up-btn").on('click', function () {
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var formData = new FormData();
            var file = $('#upfile')[0].files[0];
            var token=$('input[name=_token]').val();
            formData.append('file', file);
            formData.append('type', 1);
            formData.append('_token', token);
            $.ajax({
                url: $form[0].action,
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {

                    var resJ = $.parseJSON(res);
                    console.log(resJ);
                    if(resJ.message==200){
                        $(".js-res-file").attr('src', resJ.data.file);
                        $("#filename").val(resJ.data.file);
                    }

                    var html = '<h4>'
                        + resJ.message + '<small class="hidden">'
                        + resJ.status
                        + '</small></h4>';
                    $form.find(".reg-msg").html(html);
                }
            });
        }
    });
    $('#upfile').on('change',function(){
        $('.show-file-path').text($(this).val())
    });
});
