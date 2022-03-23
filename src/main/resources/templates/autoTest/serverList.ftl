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
    <legend>服务器管理</legend>
</fieldset>
<div class="layui-col-md12" style="padding-left: 10px;padding-right: 10px">
    <button class="layui-btn layui-btn-normal" style="text-align: center;" id="addServer">
        添加
    </button>
</div>
<div class="layui-col-md12" style="padding-left: 10px;padding-right: 10px">
    <table class="layui-table" id="serverList" lay-filter="serverList"></table>
</div>
<!-- 模版 -->
<script type="text/html" id="operating">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="status">开关</button>
        <button class="layui-btn layui-btn-sm" lay-event="edit">编辑</button>
        {{# if(d.isSwitch == '关闭'){ }}
        <button class="layui-btn layui-btn-sm layui-btn-normal" lay-event="interface">接口</button>
        {{# } else { }}
        <button class="layui-btn layui-btn-sm layui-btn-normal" lay-event="serverInterFace">接口</button>
        {{# } }}
    </div>
</script>
<script>
    //表格数据初始化
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#serverList'
            , url: '/ServiceList/getServiceList/' //数据接口
            , page: true //开启分页
            , cols: [[ //表头
                {field: 'id', title: 'ID', width: '5%', sort: true, type: 'numbers'}
                , {field: 'serverAddress', title: '服务器地址', width: '74%', sort: true}
                , {field: 'isSwitch', title: '状态', width: '5%'}
                , {field: 'operating', title: '操作', width: '16%', toolbar: '#operating'}
            ]]
        });
        table.on('tool(serverList)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
            if (layEvent === 'interface') {
                layer.msg('服务已关闭 ！！！');
            } else if (layEvent == 'serverInterFace') {
                window.location.href = "../autoTest/serverInterFace?url=" + data.serverAddress;
            } else if (layEvent === 'status') {
                if (data.isSwitch === '开启') {
                    layer.confirm('确认关闭 ？', {
                        btn: ['确认', '取消']
                    }, function () {
                        $.get(
                            "../ServiceList/updateIsOpenById",
                            {id: data.id, isOpen: 0},
                            function (data) {
                                if (data == 1) {
                                    layer.msg('已关闭', {
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
                } else {
                    layer.confirm('确认开启 ？', {
                        btn: ['确认', '取消'] //按钮
                    }, function () {
                        $.get(
                            "../ServiceList/updateIsOpenById",
                            {id: data.id, isOpen: 1},
                            function (data) {
                                if (data == 1) {
                                    layer.msg('已开启', {
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
                }
            } else if (layEvent === 'edit') {
                layer.prompt({
                    title: '请填写修改的服务器地址',
                    formType: 2,
                    value: data.serverAddress,
                    area: ['300px', '40px']
                }, function (text, index) {
                    $.get(
                        "../ServiceList/updateServerAddressById",
                        {id: data.id, serverAddress: text},
                        function (data) {
                            if (data == 1) {
                                layer.msg('已修改', {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    layer.close(index);
                                    location.reload();
                                });
                            }
                        }
                    );
                });
            }
        });
    });
</script>
<script>
    window.onload = layui.use(['layer'], function () {
        var addServer = document.getElementById('addServer');
        addServer.addEventListener("click", addServerClick);
        function addServerClick (event){
            layer.prompt({
                title: '请填写新的服务器地址',
                formType: 2,
                area: ['300px', '40px']
            }, function (text, index) {
                $.get(
                    "../ServiceList/insterServerList",
                    {serverAddress: text},
                    function (data) {
                        if (data == 1) {
                            layer.msg('添加成功', {
                                icon: 1,
                                time: 1000
                            }, function () {
                                layer.close(index);
                                location.reload();
                            });
                        }
                    }
                );
            });
        }
    })
</script>
</body>
</html>