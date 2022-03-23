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
        $.get("../repayTestStory/annualReport", function (data) {
            var dataJson = JSON.parse(data);
            var title = {
                text: '每月提测故事'
            };
            var subtitle = {
                text: 'Company: finupgroup.com'
            };
            var xAxis = {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            };
            var yAxis = {
                title: {
                    text: ' '
                }
            };
            var plotOptions = {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            };
            var series = [{
                name: '测试故事数',
                data: [dataJson.Jan,
                    dataJson.Feb,
                    dataJson.Mar,
                    dataJson.Apr,
                    dataJson.May,
                    dataJson.Jun,
                    dataJson.Jul,
                    dataJson.Aug,
                    dataJson.Sep,
                    dataJson.Oct,
                    dataJson.Nov,
                    dataJson.Dec]
            }];

            var json = {};

            json.title = title;
            json.subtitle = subtitle;
            json.xAxis = xAxis;
            json.yAxis = yAxis;
            json.series = series;
            json.plotOptions = plotOptions;
            $('#container').highcharts(json);
        });
    });
</script>
</body>
</html>