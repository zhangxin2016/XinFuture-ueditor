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
        url: "http://localhost:8088/article/insert?t=" + (new Date()).getTime(), // 加随机数防止缓存
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