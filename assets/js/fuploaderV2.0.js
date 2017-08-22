/**
 * Created by jsbfec on 2017/6/30.
 */

;(function ($, window, document, undefined) {

    var Fuploader = function (elm, options) {
        this.defaults = {
            fileNumLimit: 1,
            fileSingleSizeLimit: 2,//默认2M
            api: '/enterprise/passport/uploadpicture',
            msg: '',
            fileList: [],
            container: '',
            previewListWrapper: '.preview-list',
            previewItem: '.preview-item',
            inputId: '',
            outputId: '',
            fileItemTag: 'fileItem',
            uploadModel: 'single',//single
            callback: function () {
                console.log('empty callback');
            },
            previewImg: {
                images: '',
                pdf: 'data:image/png;base64,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'
            },
            type: 'image'
        };
        this.$elm = $(elm);
        this.opts = $.extend({}, this.defaults, options);
    };
    Fuploader.prototype = {
        init: function () {
            var self = this;
            var opts = self.opts;
            var $elm = self.$elm;
            var $previewItem = $elm.find(opts.previewItem);

            if (opts.fileNumLimit > 1) {
                opts.fileList.length = $previewItem.length;
                console.log(opts.fileList.length);
            }else{

            }
            self.inputHandle();
            self.uploadHandle();
            self.deleteHandle();
            self.rechooseHandle();
        },
        readerFile: function (file, i) {
            var self = this;
            var opts = self.opts;
            var preview = '#' + opts.fileItemTag + i;
            var reader = new FileReader;
            if (file) {
                reader.readAsDataURL(file);
            }
            var $img = $(preview);
            if (opts.type == 'image') {
                reader.onload = function () {
                    $img.attr('src', this.result);
                };
            } else if (opts.type == 'pdf') {
                $img.attr('src', opts.previewImg.pdf);
            }
        },
        imgPreview: function (input, wrapper) {
            var self = this;
            var opts = self.opts;
            var msg = opts.msg;
            var $previewItem=self.$elm.find('.preview-item');

            if (typeof(FileReader) === 'undefined') {
                alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
            } else {
                try {
                    /*图片转Base64 核心代码*/
                    var fileLength = input.files.length;

                    var length=0;
                    if(opts.fileNumLimit>1){
                        length=fileLength+$previewItem.length
                    }
                    if(opts.fileNumLimit>=length){
                        for (var i = 0; i < fileLength; i++) {
                            var file = input.files[i];

                            opts.fileList.push(file);

                            var name = file.name;
                            var size = file.size;
                            var text = '等待上传';
                            var reg = new RegExp(opts.type, "gi");

                            //判断类型
                            if (!reg.test(file.type)) {
                                opts.msg = opts.msg + '<p>' + name + '请确保文件为' + opts.type + '类型</p>';
                            }
                            //判断大小
                            if (self.countSize(size).mb > opts.fileSingleSizeLimit) {
                                opts.msg = opts.msg + '<p>' + name + '文件超出限制</p>';
                            }
                            //判断错误信息
                            if (opts.msg != '') {
                                modalx(opts.msg)
                            }
                            var index = 0;
                            if (opts.fileNumLimit > 1) {
                                index = opts.fileList.length - 1;
                            }

                            var html = '<figure class="fig-normal preview-item waiting" draggable="true" data-index="' + index + '" >' +
                                '<div class="img-shell">' +
                                '<div class="btn-box"><i class="fa fa-remove del-preview"></i></div>' +
                                '<div class="paddingT"></div>' +
                                '<img id="' + (opts.fileItemTag + index) + '" src="" alt="" class="fig-img">' +
                                '</div>' +
                                '<figcaption>' +
                                '<h4 class="fig-tit">' + name + '</h4>' +
                                '<div class="fig-info text-center">' + self.countSize(size).size + '</div>' +
                                '<div class="fig-progress text-center">' + text + '</div>' +
                                '</figcaption>' +
                                '</figure>';
                            if (!index) {
                                $(wrapper).html(html);
                            } else {
                                $(wrapper).append(html);
                            }
                            self.readerFile(file, index);
                        }
                    }else{
                        modalx('文件数量超过限制:'+opts.fileNumLimit);
                    }

                } catch (e) {
                    console.log('图片转Base64出错啦！' + e.toString());
                }
            }
        },
        inputHandle: function () {
            var self = this;
            var opts = self.opts;
            var inputId = opts.inputId;
            var $btn=self.$elm.find('.js-startUp');
            var $elm = self.$elm;
            var $previewListWrapper = $elm.find(opts.previewListWrapper);
            var $uploadBtn = $elm.find('.uploader-btn');
            var $uploadBtn2 = $elm.find('.uploader-info');
            $(inputId).change(function () {

                self.imgPreview(this, $previewListWrapper);
                $uploadBtn.hide();
                $uploadBtn2.show();

            });
            //$btn.on('click',function(){
            //    $(inputId).val('');
            //})
        },
        uploadImg: function (formData, file, api, imgBox) {
            var self=this;
            var opts=self.opts;
            var $imgBox = $(imgBox);
            var $output=self.$elm.find(opts.outputId);
            formData.append('file', file);
            $.ajax({
                url: api,
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    var resJ = parseData(res);
                    if (resJ.status == 200) {

                        var path = resJ.data.name;
                        $imgBox.find('.fig-progress').html('<div class="color-success">已完成</div>');
                        $imgBox.data('path', path);
                        $imgBox.removeClass('waiting').addClass('success');

                        $output.val(self.getVal());

                    } else {
                        modalx(resJ.message);
                    }

                },
                timeout: 60000,
                error: function (xhr, textStatus) {
                    console.log('error:' + textStatus);

                    if (textStatus == 'timeout') {
                        $imgBox.find('.fig-progress').html('<div class="color-warning">上传超时</div>');
                    } else {

                        $imgBox.find('.fig-progress').html('<div class="color-warning">上传失败</div>');
                    }
                }
            });
        },
        uploadAll: function (callback) {
            var self = this;
            var opts = self.opts;
            var _api = opts.api;
            var files = opts.fileList;
            var outputId = opts.outputId;
            var $elm = self.$elm;
            var $valList=$elm.find(opts.previewListWrapper);
            var $waitingItem = $elm.find('.waiting');
            if (files.length) {
                var _token = $('input[name=_token]').val();
                var type = $('#type').val();
                var formData = new FormData();
                var cs = 0;

                formData.append('type', type);
                formData.append('_token', _token);

                $waitingItem.each(function () {
                    var $this = $(this);
                    var index = $this.data('index');
                    self.uploadImg(formData, files[index], _api, this);
                });
            }
            callback()

        },
        uploadHandle: function () {
            var self = this;
            var opts = self.opts;
            var $elm = self.$elm;
            var $waitingItem = $elm.find('.waiting');
            var $upbtn = $elm.find('.js-startUp');

            $upbtn.on('click', function (e) {

                e.preventDefault();
                $waitingItem.find('.fig-progress').html('<div class="preloader-tit">正在上传</div><div class="preloader"></div>');
                self.uploadAll(opts.callback);
            });
        },
        countSize: function (num) {
            return {
                mb: (num / (1024 * 1024)).toFixed(2),
                size: num / (1024 * 1024) > 1 ? (num / (1024 * 1024)).toFixed(2) + 'mb' : (num / 1024).toFixed(2) + 'kb'
            }
        },
        deleteHandle: function () {
            var self = this;
            var opts = self.opts;
            var $elm = self.$elm;
            $elm.on('click', '.del-preview', function () {
                var $this = $(this);
                var $parent = $this.parents(opts.previewItem);
                var index = $parent.data('index');

                $parent.remove();
                if (opts.fileNumLimit > 1) {
                    delete opts.fileList[index];
                }
            });
        },
        rechooseHandle:function(){
            var self=this;
            var $elm=self.$elm;
            var $rechoose=$elm.find('.js-choose');
            var $input=$(self.opts.inputId);
            $rechoose.on('click',function(){
                $input.val('');
            })
        },
        getVal: function () {
            var self=this;
            var $elm=self.$elm;
            var opts=self.opts;
            var $previewItem=$elm.find('.success');
            var val='';
            if($previewItem.length){
                $previewItem.each(function (i) {
                    val = val + (val == '' ? '' : ',') + $(this).data('path');
                });
            }

            return val;
        }

    };
    $.fn.extend({
        fUploader: function (options) {
            return this.each(function () {
                var fUploaderInitial = new Fuploader(this, options);
                fUploaderInitial.init();
            });
        }
    });
})(jQuery, window, document);


function sortFoo() {
    if ($('#foo').children().length) {
        sortItem('#foo');
    }
}
function sortItem(elm) {
    $(elm).sortable();
}
