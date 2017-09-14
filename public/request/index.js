var insertUrl = "http://localhost:8088/article/insert"
function addArticle() {
    var typeContent = $('#typeSelect option:selected').text();
    var title = $("#articletitle").val();
    var keywords = $("#keywords").val();
    var abstract_ = $("#abstract_").val();
    var content = getContent();
    console.log(typeContent)
    console.log(title)
    console.log(keywords)
    console.log(abstract_)
    console.log(content)
    $.ajax({
        url: insertUrl+"?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "post",
        datType: "JSON",
        contentType: "application/json",
        data:JSON.stringify({
            blogauthor:"zhangxin",
            blogtype:typeContent,
            blogtitie:title,
            blogkeywords:keywords,
            blogabstract:abstract_,
            blogcontent:content
        }),
        success: function (data) {
            alert(data);
        }
    });
}

/*
 * 实时显示 textarea 输入的字数
*/
(function($) {
    $.fn.limitTextarea = function(opts) {
        var defaults = {
            maxNumber: 200, //允许输入的最大字数
            position: 'top', //提示文字的位置，top：文本框上方，bottom：文本框下方
            onOk: function() {}, //输入后，字数未超出时调用的函数
            onOver: function() {} //输入后，字数超出时调用的函数
        }
        var option = $.extend(defaults, opts);
        this.each(function() {
            var _this = $(this);
            var info = '<p class="textarea-numberbar" id="info"><em class="textarea-length">' +
                '<b>' + (option.maxNumber - _this.val().length) + '</b></em>/<em class="textarea-length">200</em></p>';
            var fn = function() {
                var $info = $('#info');
                var extraNumber = 200-(option.maxNumber - _this.val().length);
                if (extraNumber >= 0) {
                    $info.html('<em class="textarea-length">' +
                        '<b>' + extraNumber + '</b></em>/<em class="textarea-length">200</em>')
                    //$info.html('还可以输入<b>' + extraNumber + '</b>个字');
                    option.onOk();
                } else {
                    $info.html('已经超出<b style="color:red;">' + (-extraNumber) + '</b>个字');
                    option.onOver();
                }
            };
            switch (option.position) {
                case 'top':
                    _this.before(info);
                    break;
                case 'bottom':
                default:
                    _this.after(info);
            }
            //绑定输入事件监听器
            if (window.addEventListener) { //先执行W3C
                _this.get(0).addEventListener("input", fn, false);
            } else {
                _this.get(0).attachEvent("onpropertychange", fn);
            }
            if (window.VBArray && window.addEventListener) { //IE9
                _this.get(0).attachEvent("onkeydown", function() {
                    var key = window.event.keyCode;
                    (key == 8 || key == 46) && fn(); //处理回退与删除
                });
                _this.get(0).attachEvent("oncut", fn); //处理粘贴
            }
        });
    }
})(jQuery)
//插件调用；
$(function() {
    $('#abstract_').limitTextarea({
        maxNumber: 200, //最大字数
        position: 'bottom', //提示文字的位置，top：文本框上方，bottom：文本框下方
        onOk: function() {
            $('#test').css('background-color', 'white');
        }, //输入后，字数未超出时调用的函数
        onOver: function() {
            $('#test').css('background-color', 'lightpink');
        } //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色
    });
});
/* 实时显示 textarea 输入的字数 结束 */