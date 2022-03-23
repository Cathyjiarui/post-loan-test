<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="text/html;charset=UTF-8"/>
    <title>贷后测试服务</title>
    <link href="/plugins/layui/css/layui.css" rel="stylesheet"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px">
    <legend>测试故事列表</legend>
</fieldset>
<div class="layui-col-md12" style="padding-left: 10px;padding-right: 10px">
    <div class="layui-btn-group">
        <button class="layui-btn layui-btn-normal" style="text-align: center" id="addTestCase">
            添加
        </button>
        <button class="layui-btn layui-btn-normal" style="text-align: center" id="findTestCase">
            查找
        </button>
    </div>
</div>
<div class="layui-col-md12" style="padding-left: 10px;padding-right: 10px">
    <table class="layui-table" id="testList" lay-filter="testList"></table>
</div>
<!-- 模版 -->
<script type="text/html" id="experience">
    <div class="layui-btn-container">
        {{# if(d.receive == 0){ }}
        <button class="layui-btn layui-btn-sm layui-btn-warm" lay-event="receive">领取</button>
        {{# } else { }}
        <button class="layui-btn layui-btn-sm" lay-event="goBack">退回</button>
        {{# } }}
        <button class="layui-btn layui-btn-sm" lay-event="edit">编辑</button>
        <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="end">结束</button>
        {{# if(d.isImportant == 1){ }}
        <button class="layui-btn layui-btn-sm" lay-event="isImportant">取消</button>
        {{# } else { }}
        <button class="layui-btn layui-btn-sm layui-btn-normal" lay-event="isImportant">重要</button>
        {{# } }}
    </div>
</script>
<script type="text/html" id="associationStoryPoint">
    <a class="layui-table-link" href="{{d.gitAddress}}" target="_blank">{{d.associationStoryPoint}}</a>
</script>
<script type="text/html" id="testName">
    {{# if(d.testName == null){ }}
    未领取
    {{# } else { }}
    {{d.testName}}
    {{# } }}
</script>
<script type="text/html" id="id">
    {{# if(d.isImportant == 1){ }}
    <h4 style="color:red">重要</h4>
    {{# } else { }}
    {{d.id}}
    {{# } }}
</script>
<script>
    layui.use('table', function () {
        var table = layui.table;
        //第一个实例
        table.render({
            elem: '#testList'
            , url: '/repayTestStory/openTestList/' //数据接口
            , page: true //开启分页
            , cols: [[ //表头
                {field: 'id', title: 'ID', width: '5%', sort: true, toolbar: '#id'}
                , {field: 'createTime', title: '提测时间', width: '10%'}
                , {field: 'storyContent', title: '故事内容', width: '48%', sort: true}
                , {field: 'testName', title: '测试员', width: '7%', toolbar: '#testName'}
                , {field: 'associationStoryPoint', title: '故事编号', width: '10%', toolbar: '#associationStoryPoint'}
                , {field: 'experience', title: '操作', width: '20%', toolbar: '#experience', fixed: 'right'}
            ]]
        });
        table.on('tool(testList)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
            if (layEvent === 'receive') {
                layer.prompt({title: '请输入领用人姓名', formType: 0}, function (text, index) {
                    $.get(
                        "../repayTestStory/receiveTestCase",
                        {id: data.id, testName: text},
                        function (data) {
                            if (data == 1) {
                                layer.msg('领用成功', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    location.reload();
                                });
                            }
                        }
                    );
                });
            } else if (layEvent === 'goBack') {
                layer.confirm('您确认退回吗？', {
                    btn: ['确认', '取消']
                }, function () {
                    $.get(
                        "../repayTestStory/goBack",
                        {id: data.id},
                        function (data) {
                            if (data == 1) {
                                layer.msg('成功', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    location.reload();
                                });
                            }
                        }
                    );
                }, function () {

                });
            } else if (layEvent === 'edit') {
                layer.open({
                    type: 2,
                    title: '编辑测试故事',
                    area: ['900px', '400px'],
                    fixed: false,
                    maxmin: true,
                    content: '../checkList/editTestCase?id=' + data.id
                });
            } else if (layEvent === 'end') {
                layer.confirm('您确认结束吗？', {
                    btn: ['确认', '取消']
                }, function () {
                    $.get(
                        "../repayTestStory/endTestCaseById",
                        {id: data.id},
                        function (data) {
                            if (data == 1) {
                                layer.msg('成功', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    location.reload();
                                });
                            }
                        }
                    );
                }, function () {

                });
            } else if (layEvent === 'isImportant') {
                if (data.isImportant == 0) {
                    $.get(
                        "../repayTestStory/updateIsImportantById",
                        {id: data.id, isImportant: 1},
                        function (data) {
                            if (data == 1) {
                                layer.msg('成功', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    location.reload();
                                });
                            }
                        }
                    );
                } else {
                    $.get(
                        "../repayTestStory/updateIsImportantById",
                        {id: data.id, isImportant: 0},
                        function (data) {
                            if (data == 1) {
                                layer.msg('成功', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    location.reload();
                                });
                            }
                        }
                    );
                }
            }
        });
    });
</script>
<script>
    window.onload = layui.use(['layer'], function () {
        var addTestCase = document.getElementById('addTestCase');
        addTestCase.addEventListener("click", addTestCaseClick);

        function addTestCaseClick(event) {
            layer.open({
                type: 2,
                title: '添加测试故事',
                area: ['900px', '260px'],
                fixed: false,
                maxmin: true,
                content: '../checkList/addTestCase'
            });
        }
    });
</script>
<script>
    window.onload = layui.use(['layer'], function () {
        var findTestCase = document.getElementById('findTestCase');
        findTestCase.addEventListener("click",findTestCaseClick);
        function findTestCaseClick(event) {
            layer.prompt({title: '请输入查找的故事编号', formType: 0}, function(text, index){
                $.get(
                    "../repayTestStory/findTestCaseByAssociationStoryPoint",
                    {associationStoryPoint: text},
                    function (data) {
                        layer.alert('id: ' + data.id + '</br>'
                        + '故事内容: ' + data.storyContent + '</br>'
                        + '测试员名称: ' + data.testName + '</br>'
                        + '关联故事: <a class="layui-table-link" target="_blank" href=' + data.gitAddress + '>' + data.associationStoryPoint) + '</a>';
                        layer.close(index);
                    }
                );
            });
        }
    })
</script>
</body>
</html>