<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/plugins/layui/css/layui.css"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/layui/layui.js"></script>
</head>
<body>
<div class="layui-fluid" style="padding-top: 20px; width: 80%">
    <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">核心进件号</label>
            <div class="layui-input-block">
                <input type="text" name="coreRequestId" required lay-verify="required" placeholder="请输入核心进件号"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">放款金额</label>
            <div class="layui-input-block">
                <input type="text" name="amount" required lay-verify="required" placeholder="请输入放款金额"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">签约金额</label>
            <div class="layui-input-block">
                <input type="text" name="signedAmount" required lay-verify="required" placeholder="请输入签约金额"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">核心客户ID</label>
            <div class="layui-input-block">
                <input type="text" name="coreLendCustomerId" required lay-verify="required" placeholder="请输入核心客户ID"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">合同编号</label>
            <div class="layui-input-block">
                <input type="text" name="lendContractCode" required lay-verify="required" placeholder="请输入合同编号"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">进件号</label>
            <div class="layui-input-block">
                <input type="text" name="requestId" required lay-verify="required" placeholder="请输入业务id"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">托管模式</label>
            <div class="layui-input-block">
                <input type="radio" name="isDeposit" value="1" title="是" checked>
                <input type="radio" name="isDeposit" value="0" title="否">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">姓名</label>
            <div class="layui-input-block">
                <input type="text" name="name" required lay-verify="required" placeholder="请输入姓名"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">身份证号</label>
            <div class="layui-input-block">
                <input type="text" name="idNo" required lay-verify="required" placeholder="请输入身份证号"
                       autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">账户类型</label>
            <div class="layui-input-block">
                <input type="text" name="loanChannelType" required lay-verify="required" placeholder="请输入账户类型"
                       autocomplete="off" value="ONLINE_IQIANJIN"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">选择框</label>
            <div class="layui-input-block">
                <select name="serviceCode" lay-verify="required">
                    <option value="puhui_lend">个贷</option>
                    <option value="puhui_lend_app">个贷APP</option>
                    <option value="jiea_online">借啊</option>
                    <option value="puhui_renmai">任买</option>
                    <option value="puhui_shanjie">小凡</option>
                    <option value="puhui_renmai_p2p">任买P2P</option>
                    <option value="puhui_renmai_wenzhou">任买温州银行</option>
                    <option value="finup_fancard">钒卡</option>
                    <option value="finup_qianzhan_pb">钱站PB</option>
                    <option value="puhui_paydayloan_ff">月光侠-FF</option>
                    <option value="puhui_fanyin">凡银</option>
                    <option value="puhui_renmai_zhongan">任买众安</option>
                    <option value="puhui_renmai_ybjr">任买易宝</option>
                    <option value="renmai_repo">任买回购</option>
                    <option value="renmai_zxxt">任买中信信托</option>
                    <option value="renmai_xyd">任买小雨点</option>
                    <option value="finup_aibt">爱白条</option>
                    <option value="renmai_ryh">任意花</option>
                    <option value="finup_sjf">速金服</option>
                    <option value="finup_sjfpb">速金服PB</option>
                    <option value="finup_aibtpro">爱白条大额</option>
                    <option value="puhui_paydayloanpro_ff">月光侠大额-FF</option>
                </select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">推送服务</label>
            <div class="layui-input-block">
                <select name="url" lay-verify="required">
                    <option value="http://post-loan-external-rest.postloan.test">
                        http://post-loan-external-rest.postloan.test
                    </option>
                    <option value="http://post-loan-external-rest.postloan.beta">
                        http://post-loan-external-rest.postloan.beta
                    </option>
                </select>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo">推送</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>

    <script>
        layui.use('form', function () {
            var form = layui.form;
            //监听提交
            form.on('submit(formDemo)', function (data) {
                layer.msg('推送中', {
                    icon: 16
                    , shade: 0.01
                });
                $.ajax({
                    type: 'POST',
                    url: "/pushTestCase/pushCase",
                    contentType: "application/json;charset=utf-8;",
                    data: JSON.stringify(data.field),
                    success: function (result) {
                        layer.msg(result);
                    }
                });
                return false;
            });
        });
    </script>
</div>
</body>
</html>