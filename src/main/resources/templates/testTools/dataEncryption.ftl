<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/plugins/layui/css/layui.css"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px">
    <legend>文本加解密</legend>
</fieldset>
<div class="layui-main" style="">
    <textarea name="data" class="layui-textarea" id="data"></textarea>
    <div class="layui-btn-container" style="text-align: center">
        <button type="button" class="layui-btn" style="margin-top: 50px; margin-bottom: 50px; margin-right: 50px"
                id="encrypt">加密
        </button>
        <button type="button" class="layui-btn" style="margin-top: 50px; margin-bottom: 50px" id="decipher">解密</button>
    </div>
    <textarea name="process" class="layui-textarea" readonly="readonly" id="process"></textarea>
</div>
<script>
    window.onload = layui.use(['layer'], function () {
        var encrypt = document.getElementById('encrypt');
        encrypt.addEventListener("click", encryptClick);
        function encryptClick(event) {
            var data = document.getElementById('data');
            $.get(
                "../dataProcessing/encrypt",
                {encrypt: data.value},
                function (data) {
                    var process = document.getElementById('process');
                    process.value = data;
                });
        }
    });
</script>
<script>
    window.onload = layui.use(['layer'], function () {
        var decipher = document.getElementById('decipher');
        decipher.addEventListener("click", decipherClick);
        function decipherClick(event) {
            var data = document.getElementById('data');
            $.get(
                "../dataProcessing/decipher",
                {decipher: data.value},
                function (data) {
                    var process = document.getElementById('process');
                    process.value = data;
                });
        }
    });
</script>
</body>
</html>