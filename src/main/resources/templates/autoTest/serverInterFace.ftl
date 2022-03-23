<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <link href="/plugins/layui/css/layui.css" rel="stylesheet"/>
    <script src="/plugins/layui/layui.js"></script>
    <script src="/js/jquery-3.5.1.min.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px">
    <legend>接口列表</legend>
</fieldset>
<div class="layui-col-md12" style="padding-left: 10px;padding-right: 10px">
    <table class="layui-table" id="serverInterFaceList" lay-filter="serverInterFaceList"></table>
</div>
<script>
    //表格数据初始化
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#serverInterFaceList'
            , height: 'full-200'
            , url: '/ServiceList/serverInterFaceList/' //数据接口
            , where: {url: '${url}'}
            , page: true //开启分页
            , cols: [[ //表头
                {field: 'id', title: '编号', width: '5%', type: 'numbers'}
                , {field: 'requestMethod', title: '请求方式', width: '8%'}
                , {field: 'serverAddress', title: '请求地址', width: '50%'}
                , {field: 'interFaceRemarks', title: '接口说明',width: '15%'}
                , {field: 'parameters', title: '请求参数'}
                , {field: 'responseMsg', title: '返回信息'}
            ]]
        });
    })
</script>
</body>
</html>