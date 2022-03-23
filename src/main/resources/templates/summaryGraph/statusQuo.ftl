<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="text/html;charset=UTF-8"/>
    <title>贷后测试服务</title>
    <link href="/plugins/layui/css/layui.css" rel="stylesheet"/>
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/plugins/highcharts/highcharts.js"></script>
</head>
<body>
<div class="layui-container">
    <div class="layui-row">
        <div class="layui-col-md6" style="padding-top: 20px">
            <div id="container" style="width: 550px; height: 400px; margin: 0 auto"></div>
        </div>
    </div>
</div>
<script language="JavaScript">
    $(document).ready(function () {
        $.get("../repayTestStory/testSituation", function (data) {
            var dataJson = JSON.parse(data);
            var chart = {
                type: 'column'
            };
            var title = {
                text: '贷后故事测试现状'
            };
            var subtitle = {
                text: 'Company: finupgroup.com'
            };
            var xAxis = {
                categories: ['在测故事', '提测故事'],
                crosshair: true
            };
            var yAxis = {
                min: 0,
                title: {
                    text: ''
                }
            };
            var tooltip = {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><b>：{point.y}</b></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            };
            var plotOptions = {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    colorByPoint: false
                }
            };
            var credits = {
                enabled: false
            };

            var series = [{
                name: '故事数',
                data: [{
                    y: dataJson.testing,
                    color: "#5FB878"
                }, {
                    y: dataJson.test,
                    color: "#FFB800"
                }]
            }];

            var json = {};
            json.chart = chart;
            json.title = title;
            json.subtitle = subtitle;
            json.tooltip = tooltip;
            json.xAxis = xAxis;
            json.yAxis = yAxis;
            json.series = series;
            json.plotOptions = plotOptions;
            json.credits = credits;
            $('#container').highcharts(json);
        });
    });
</script>
</body>
</html>