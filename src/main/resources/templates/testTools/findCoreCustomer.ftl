<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/plugins/layui/css/layui.css"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px">
    <legend>查询核心客户信息</legend>
</fieldset>
<hr class="layui-bg-green">
<form class="layui-form" action="" style="width: 80%; padding-left: 50px">
    <div class="layui-form-item">
        <label class="layui-form-label">客户id</label>
        <div class="layui-input-block">
            <input type="text" name="coreCustomerId" required lay-verify="required" placeholder="客户id"
                   autocomplete="off"
                   class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">查询</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
<script>
    layui.use('form', function () {
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function (data) {
            var dataJson = JSON.parse(JSON.stringify(data.field));
            $.get(
                "../coreCustomer/getCoreCustomerById",
                {id: dataJson.coreCustomerId},
                function (reslut) {
                    var reslutMessage = "用户名为：" +  reslut.name + "</br>身份证号为：" + reslut.idNo;
                    layer.msg(reslutMessage);
                }
            );

            return false;
        });
    });
</script>
</body>
</html>