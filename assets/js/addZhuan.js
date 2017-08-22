/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {

    var $form= $("#addZhuan");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
        ,
        fields: {
            'expert_avatar': {
                validators: {
                    notEmpty: {
                        message: '请上传头像'
                    },
                    regexp: {
                        regexp: /.(gif|jpg|jpeg|png|gif|jpg|png)$/,
                        message: '图片格式仅限gif,jpg,jpeg,png,gif,jpg,png'
                    }
                }
            },
            'expert_name': {
                validators: {
                    notEmpty: {
                        message: '请输入专家名称'
                    }
                }
            },
            'expert_job': {
                validators: {
                    notEmpty: {
                        message: '请输入专家职位'
                    }
                }
            },
            'expert_area[]': {
                validators: {
                    notEmpty: {
                        message: '请输入专家领域'
                    }
                }
            },
            'expert_qrcode_url': {
                validators: {
                    notEmpty: {
                        message: '请输入专家二维码链接'
                    }
                }
            },
            'answer': {
                validators: {
                    notEmpty: {
                        message: '请输入专家解答'
                    }
                }
            }
        }
    };
    $form.bootstrapValidator(validater).on('success.form.bv', function (e) {//点击提交之后
        e.preventDefault();

        var data=$form.serialize();

        $form.ajaxSubmit({
            type:'POST',
            url: $form[0].action,
            dataType: 'json',
            data: data,
            contentType: false,
            cache: false,
            processData:false,

            beforeSubmit: function() {
                //submit之前的处理
            },
            uploadProgress: function (event, position, total, percentComplete){
                //在这里控制进度条
            },
            success:function(res){
                console.log(res);
                var resJ = res;
                modalx(resJ.message);
                if (resJ.status != 200) {
                    $form.find('button[type="submit"]').prop('disabled', false);
                }else {
                    goback();
                }
            },
            error:function(data){
                console.log('报存出错');
            }
        });
    });

    $('.js-add-export-area').on('click',function(){
        var $this=$(this);
        var index=$this.index();
        var $parent=$this.parent();
        var $areawrapper=$('.export-area');
        var input='<input type="text" id="lingyu'+(index+1)+'" class="form-control" name="expert_area[]" value="">';
        var btn='<button type="button" class="btn btn-green btn-export-area js-remove-export-area">-</button>';
        $parent.append(btn);
        $areawrapper.append(input);
    });
    $(document).on('click','.js-remove-export-area',function(){
        var $this=$(this);
        var index=$this.index();
        var $areawrapper=$('.export-area');
        $areawrapper.find('input').eq(index).remove();
        $this.remove();
    });
});
