<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/plugins/layui/css/layui.css"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<div class="layui-fluid" style="padding-top: 20px">
    <form class="layui-form" action="" style="height: 100%">
        <div class="layui-form-item">
            <label class="layui-form-label">Git地址</label>
            <div class="layui-input-block">
                <input type="text" name="gitAddress" placeholder="Git地址" autocomplete="off" lay-verify="required"
                       class="layui-input"/>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">故事编号</label>
            <div class="layui-input-block">
                <input type="text" name="associationStoryPoint" placeholder="故事编号" autocomplete="off"
                       lay-verify="required" class="layui-input"/>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo" id="add">添加</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>
<script>
    //Demo
    layui.use('form', function () {
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function (data) {
            var addbtn = document.getElementById('add');
            addbtn.setAttribute("disabled","disabled");
            $.ajax({
                type: 'POST',
                url: "../repayTestStory/insertCase",
                contentType: "application/json;charset=utf-8;",
                data: JSON.stringify(data.field),
                success: function (result) {
                    if(result == 1){
                        layer.msg('添加成功', {time : 1000}, function () {
                            //关闭
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            parent.location.reload();
                        });
                    }
                },
            });
            return false;
        });
    });
</script>
</body>
</html>