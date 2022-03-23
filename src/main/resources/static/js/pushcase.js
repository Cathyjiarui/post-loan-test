//获取推送按钮点击进行推案件操作
window.onload = layui.use(['layer'], function () {
    var push = document.getElementById("pushgroup");
    push.onclick = function (event) {
        switch (event.target.id) {
            case 'puhuilend':
                pushcase('puhuiLend');
                break;
            case 'puhuiLendApp':
                pushcase('puhuiLendApp');
                break;
            case 'jieaOnline':
                pushcase('jieaOnline');
                break;
            case 'puhuiShanjie':
                pushcase('puhuiShanjie');
                break;
            case 'finupFancard':
                pushcase('finupFancard');
                break;
            case 'finupQianzhanPB':
                pushcase('finupQianzhanPB');
                break;
            case 'puhuiPaydayloanFF':
                pushcase('puhuiPaydayloanFF');
                break;
            case 'puhuiFanyin':
                pushcase('puhuiFanyin');
                break;
            case 'puhuiRenmaiZhongan':
                pushcase('puhuiRenmaiZhongan');
                break;
            case 'puhuiRenmaiYbjr':
                pushcase('puhuiRenmaiYbjr');
                break;
            default:
                alert('没有此渠道');
        }
        ;
    };
});

//推送案件
function pushcase(channel) {
    var pushresult = document.getElementById("pushresult");
    pushresult.innerText = "案件玩命推送中...";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', '/api/pushCase/' + channel, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var returnStr = httpRequest.responseText;
            var returnJson = JSON.parse(returnStr);
            if (returnJson.data == null) {
                pushresult.innerText = returnJson.message;
            } else {
                var reluts = "案件推送成功：核心进件号为：" + returnJson.data.coreRequestId + " 进件号为：" + returnJson.data.requestId;
                pushresult.innerText = reluts;
            }
        } else {
            pushresult.innerText = "案件推送失败,请查看相关日志。";
        }
        ;
    };
}

//
window.onload = layui.use(['layer'], function () {
    var pushtext = document.getElementById("coreRequestId");
    var pushcase = document.getElementById("pushcase");
    pushcase.onclick = function () {
        var pushresult1 = document.getElementById("pushresult1");
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', '/api/pushCase/DesignationCase?CoreRequestId=' + pushtext.value, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var returnStr = httpRequest.responseText;
                var returnJson = JSON.parse(returnStr);
                if (returnJson.data == null) {
                    pushresult1.innerText = returnJson.message;
                } else {
                    var reluts = "案件推送成功!";
                    pushresult1.innerText = reluts;
                }
            } else {
                pushresult1.innerText = "案件推送失败,请查看相关日志。";
            }
            ;
        };
    }
});