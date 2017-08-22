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
                    }, callback: {
                        callback: function (value, validator) {
                            var status = $('.res-msg small').text();
                            if(status==undefined){
                                console.log('elm can\'t be found');
                                return {
                                    valid: false,    // or false
                                    message: '参数错误请联系网站管理员反馈问题'
                                }
                            }
                            if(status==''){
                                return {
                                    valid: false,    // or false
                                    message: '请选择图片点击后上传'
                                }
                            }
                            if (status=='200'){
                                return {
                                    valid: true,    // or false
                                    message: '上传成功'
                                }
                            }

                        },
                        message: '未上传文件或上传失败'
                    }
                }
            }
        }
    };

    $form.bootstrapValidator(upLoadImgValidaters);
    var bootstrapValidator = $form.data('bootstrapValidator');
    $(".js-up-btn").on('click', function () {
        bootstrapValidator.validate();
        var status=$('.res-msg small').text();
        var upElm=$('input[name=file]').val();
        var fileElm=$(".js-res-file").data('path');
        var filename=$("#filename").val();
        if (upElm!=''&& filename!=fileElm) {
            console.log('start ajax');
            var url = '/enterprise/passport/uploadpicture';
            var _token = $('input[name=_token]').val();
            var formData = new FormData();
            var type = $('#type').val();
            var file = $('#upfile')[0].files[0];
            formData.append('file', file);
            formData.append('type', type);
            formData.append('_token', _token);
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    var resJ=parseData(res);

                    //modalx(resJ.message);
                    if (resJ.status == 200) {
                        $(".js-res-file").attr('src', resJ.data.file).data('path',resJ.data.name);
                        $("#filename").val(resJ.data.name);
                        setTimeout(function () {
                            bootstrapValidator.updateStatus('file', '').validateField('file');
                        }, 500);

                    }
                    var html = '<h4>'
                        + resJ.message + '<small class="hidden">'
                        + resJ.status
                        + '</small></h4>';
                    $form.find(".res-msg").html(html);
                }
            });
        }
    });
    $('#upfile').on('change', function () {
        $('.show-file-path').text($(this).val());
    });
});
