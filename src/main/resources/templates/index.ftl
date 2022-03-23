<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="text/html;charset=UTF-8"/>
    <title>贷后测试服务</title>
    <link href="/plugins/layui/css/layui.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body">
<div class="pace  pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99"
         style="transform: translate3d(100%, 0px, 0px);">
        <div class="pace-progress-inner"></div>
    </div>
    <div class="pace-activity"></div>
</div>
<div class="layui-layout layui-layout-admin">
    <!-- 顶部 -->
    <div class="layui-header">
        <a href="/">
            <div class="layui-logo" style="color: white">
                贷后测试服务
            </div>
        </a>
    </div>
    <!-- 左边菜单 -->
    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <ul class="layui-nav layui-nav-tree layui-nav-itemed" lay-filter="test">
                <!-- 侧边导航 -->
                <li class="layui-nav-item layui-this">
                    <a href="/checkList/testlist" target="showtestlist">
                        <i class="layui-icon layui-icon-list" style="font-size: 15px; color: #F0F0F0;"></i>
                        测试故事
                    </a>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="layui-icon layui-icon-util" style="font-size: 15px; color: #F0F0F0;"></i>
                        测试工具
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/testTools/dataEncryption" target="showtestlist">
                                <i class="layui-icon layui-icon-release" style="font-size: 15px; color: #F0F0F0;"></i>
                                数据加解密
                            </a>
                        </dd>
                    </dl>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/testTools/coreDataPosition" target="showtestlist">
                                <i class="layui-icon layui-icon-release" style="font-size: 15px; color: #F0F0F0;"></i>
                                核心案件库位置
                            </a>
                        </dd>
                    </dl>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/testTools/findCoreCustomer" target="showtestlist">
                                <i class="layui-icon layui-icon-release" style="font-size: 15px; color: #F0F0F0;"></i>
                                查询核心客户信息
                            </a>
                        </dd>
                    </dl>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/testTools/pushTestCase" target="showtestlist">
                                <i class="layui-icon layui-icon-release" style="font-size: 15px; color: #F0F0F0;"></i>
                                案件推送
                            </a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="layui-icon layui-icon-chart-screen" style="font-size: 15px; color: #F0F0F0;"></i>
                        测试统计图
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/summaryGraph/statusQuo" target="showtestlist">
                                <i class="layui-icon layui-icon-chart" style="font-size: 15px; color: #F0F0F0;"></i>
                                测试现状
                            </a>
                        </dd>
                        <dd>
                            <a href="/summaryGraph/monthlyStatistics" target="showtestlist">
                                <i class="layui-icon layui-icon-chart" style="font-size: 15px; color: #F0F0F0;"></i>
                                每月提测量
                            </a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="layui-icon layui-icon-component" style="font-size: 15px; color: #F0F0F0;"></i>
                        自动化测试
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="/autoTest/serverList" target="showtestlist">
                                <i class="layui-icon layui-icon-website" style="font-size: 15px; color: #F0F0F0;"></i>
                                服务器管理
                            </a>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
    <!-- 右边内容区域 -->
    <div class="layui-body layui-form" style="height: 100%">
        <!--<div class="layui-tab-content" style="height: 100%">-->
        <iframe class="layui-layer-iframe" frameborder="0" src="/checkList/testlist" width="100%" height="85%"
                name="showtestlist"></iframe>
        <!--</div>-->
    </div>
    <div class="layui-footer">
        <!-- 底部固定区域 -->
        ©2019 <a href="https://www.finupgroup.com/" target="_black">finupgroup.com</a>
    </div>
</div>
<script src="/plugins/layui/layui.js"></script>
<script>
    layui.use('element', function () {
        var element = layui.element;

        //…
    });
</script>
</body>
</html>