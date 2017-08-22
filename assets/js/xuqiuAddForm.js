/**
 * Created by jsbfec on 17/5/10.
 */
$(function () {
    //分类
    setCats('.js-cat', '/xuqiu/categories', '#cats');
    //百度编辑器um
    var editor = UM.getEditor('product-detail-editor', {
        //imagePath:''
    });
    var $productcontent = $('#umeditor_textarea_editorValue');
    $productcontent.prop('disabled', true);//将umeditor默认添加的textare的disabled设为true,不提交此项的值
    //表单提交验证
    var $form = $("#stepsForm");
    var validater = {
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        message: '输入不正确',
        //live: 'submitted',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        trigger:'change',
        fields: {
            'name': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '需求名称不能为空'
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
            'file': {
                message: '输入不正确',
                validators: {
                    notEmpty: {
                        message: '请上传文件'
                    },
                    regexp: {
                        regexp: /.(gif|jpg|jpeg|png|doc|docx|pdf)$/,
                        message: '文件格式为图片(gif,jpeg,jpg,png)或者文档(pdf doc docx)'
                    }
                }
            },
            'company': {
                validators: {
                    notEmpty: {
                        message: '请填写发布单位名称'
                    }
                }
            }, 'description': {
                validators: {
                    notEmpty: {
                        message: '需求描述不能为空'
                    },
                    stringLength: {
                        min: 12,
                        message: '需求描述长度至少12个字符'
                    }
                }
            }
            , 'contact_name': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    }
                }
            },
            'contact_phone': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '号码有误'
                    }
                }
            }, 'contact_telephone': {
                validators: {
                    notEmpty: {
                        message: '座机不能为空'
                    }
                }
            }, 'contact_mail': {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    regexp: {
                        regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                        message: '邮箱格式不正确'
                    }
                }
            }
            , 'expire_time': {
                validators: {
                    notEmpty: {
                        message: '此处不能为空'
                    },
                    regexp: {
                        regexp: /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/,
                        message: '请使用格式YYYY-MM-DD(例如:2017-05-19)'
                    }
                    // ,
                    //regexp: {
                    //    regexp: /(([2][0-9]{3})-(((0[13578])|1[02])-(0[1-9])|[12][0-9]|3[01])|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))|([2-9][0-9](([02468][048])|([13579][26]))-02-29)/,
                    //    message: '请使用格式YYYY-MM-DD(例如:2017-05-30)'
                    //}
                    , callback: {
                        callback: function (value, validator) {
                            var d = new Date();
                            var startTime = d.getTime();
                            var endTime = Date.parse(value);

                            return (endTime-startTime)>0
                        },
                        message: '过期日期必须大于当前日期'
                    }
                }
            }
            , 'keywords': {
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
        $('#description').val(editor.getPlainTxt());
        bootstrapValidator.updateStatus('description', '').validateField('description');
    });
    $('.selected-wrapper').on('click', function () {
        setTimeout(function () {
            bootstrapValidator.updateStatus('cid', '').validateField('cid');
        }, 500);

    });
    $(".submit").on('click', function () {
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = $form.serialize();
            var html = '';
            var url = $form.action;
            console.log(data);
            $form.ajaxSubmit({
                type: 'POST',
                url: $form[0].action,
                dataType: 'json',
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                success: function (res) {
                    console.log(res);
                    var resJ = parseData(res);
                    modalx(resJ.message);
                    if (resJ.status != 200) {
                        $form.find('button[type="submit"]').prop('disabled', false);
                    } else {
                        goback();
                    }
                },
                error: function (data) {
                    console.log('提交出错');
                }
            });
        }

    })
});
