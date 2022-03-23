<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/plugins/layui/css/layui.css"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px">
    <legend>查询案件在核心库的位置</legend>
</fieldset>
<hr class="layui-bg-green">
<form class="layui-form" action="" style="width: 80%; padding-left: 50px">
    <div class="layui-form-item">
        <label class="layui-form-label">客户id</label>
        <div class="layui-input-block">
            <input type="text" name="coreCustomerId" required lay-verify="required" placeholder="客户id"
                   autocomplete="off"
                   class="layui-input" id="customerId">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label"">数据库个数</label>
        <div class="layui-input-block">
            <input type="text" name="dataNumber" required lay-verify="required" placeholder="数据库个数" autocomplete="off"
                   class="layui-input" value="8" readonly="readonly">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">查询表</label>
        <div class="layui-input-block">
            <select name="table" lay-verify="required">
                <option value=""></option>
                <option value="32">core_lend_request</option>
                <option value="128">lend_repay_record</option>
                <option value="64">core_recharge_record</option>
                <option value="8">core_customer_branch_account</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">计算</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
<script>
    layui.use('form', function () {
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function (data) {
            $("#customerId").focus();
            var dataJson = JSON.parse(JSON.stringify(data.field));
            var customerId = dataJson.coreCustomerId;
            var dataBaseSize = dataJson.dataNumber;
            var tableSize = dataJson.table;
            var db = customerId % dataBaseSize;
            var table = customerId % tableSize;
            switch (tableSize) {
                case "32":
                    var messageString = "所在库：asset_" + db + "</br>所在表：asset_info_" + table;
                    break;
                case "128":
                    var messageString = "所在库：asset_" + db + "</br>所在表：asset_repay_plan_" + table;
                    break;
                case "64":
                    var messageString = "所在库：asset_" + db + "</br>所在表：account_customer_recharge_record_" + table;
                    break;
                case "8":
                    var messageString = "所在库：asset_" + db + "</br>所在表：account_customer_branch_" + table;
                    break;
                default:
                    var messageString = "计算错误！！！";
            }
            layer.msg(messageString);
            return false;
        });
    });
</script>
</body>
</html>