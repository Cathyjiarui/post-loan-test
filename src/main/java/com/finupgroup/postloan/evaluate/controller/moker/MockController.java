package com.finupgroup.postloan.evaluate.controller.moker;

import ch.qos.logback.core.util.TimeUtil;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @ClassName mockController
 * @Description mock服务
 * @Author JiaZhang
 * @Date 2020/3/10
 * @Version 1.0
 */
@Slf4j
@RestController
public class MockController {

    public static List<JSONObject> businessQueryResultList = new ArrayList<>();
    static {
        Map<String,Object> data1 = new HashMap<>();
        data1.put("create_time",System.currentTimeMillis());
        data1.put("mobile","xy7a87f6ecc4e7d1b079e30700e71bfe2c20160926");
        data1.put("name", "李爱忠");
        data1.put("id", 4827725);
        businessQueryResultList.add(new JSONObject(data1));
        Map<String,Object> data2 = new HashMap<>();
        data2.put("create_time",System.currentTimeMillis());
        data2.put("mobile","xya934565a369b9c5a669d8f4c4ffc347a20160926");
        data2.put("name", "张强");
        data2.put("id", 4827726);
        businessQueryResultList.add(new JSONObject(data2));
        Map<String,Object> data3 = new HashMap<>();
        data3.put("create_time",System.currentTimeMillis());
        data3.put("mobile","xy796275aa47c005ae7fa5d76ca2ade8a220160926");
        data3.put("name", "李文红");
        data3.put("id", 4827727);
        businessQueryResultList.add(new JSONObject(data3));
        Map<String,Object> data4 = new HashMap<>();
        data4.put("create_time",System.currentTimeMillis());
        data4.put("mobile","xy41b85d7a9896bc778d957ceaf126f8c620160926");
        data4.put("name", "刘正燕");
        data4.put("id", 4827728);
        businessQueryResultList.add(new JSONObject(data4));
        Map<String,Object> data5 = new HashMap<>();
        data5.put("create_time",System.currentTimeMillis());
        data5.put("mobile","xy7a87f6ecc4e7d1b079e30700e71bfe2c20160926");
        data5.put("name", "李爱忠");
        data5.put("id", 8785054);
        businessQueryResultList.add(new JSONObject(data5));
        Map<String,Object> data6 = new HashMap<>();
        data6.put("create_time",System.currentTimeMillis());
        data6.put("mobile","xyb6997cb03bef7d596258c5f75060b0e220160926");
        data6.put("name", "李嘉");
        data6.put("id", 8785055);
        businessQueryResultList.add(new JSONObject(data6));
        Map<String,Object> data7 = new HashMap<>();
        data7.put("create_time",System.currentTimeMillis());
        data7.put("mobile","xy7332f4df93c4c1438ba2faf36fb4006b20160926");
        data7.put("name", "郭芳");
        data7.put("id", 8785056);
        businessQueryResultList.add(new JSONObject(data7));
        Map<String,Object> data8 = new HashMap<>();
        data8.put("create_time",System.currentTimeMillis());
        data8.put("mobile","xy2b42c8549bc2f290fa7115e80be14dde20160926");
        data8.put("name", "蔺雷");
        data8.put("id", 8785057);
        businessQueryResultList.add(new JSONObject(data8));
    }

    private static final String TWO = "2";

    @GetMapping("/datacenter/api/v1/query/commonQuery")
    public Object CommonQuery(String tableName, String pageNum, String pageSize, String etl_tx_dt){
        log.info("收到请求,pageNum为{},pageSize为{},tableName为{}",pageNum,pageSize,tableName);
        Map<String,Object> return_value = new HashMap<>();
        return_value.put("desc","成功");
        return_value.put("success",true);
        List<Map<String,Object>> dataList = new ArrayList<>();
        if (TWO.equals(pageNum)){
            return_value.put("data",dataList);
            return return_value;
        }
        List<Long> assetList = Arrays.asList(1532117L,1538751L,2328244L);
        assetList.forEach(asset -> {
            Map<String,Object> data = new HashMap<>();
            data.put("asset_info_id",asset);
            data.put("etl_tx_dt",etl_tx_dt);
            dataList.add(data);
        });
        return_value.put("data",dataList);
        return return_value;
    }

    @PostMapping("/port/api/v1/basic")
    public Object basic(@RequestBody BasicVo basicVo){
        log.info("basic接口被调用了！！");
        JSONObject result = new JSONObject();
        result.put("businessQueryName","getcontact_gedai");
        result.put("clientId","daihou");
        result.put("requestId", basicVo.getRequestId());
        result.put("status", 1);
        result.put("businessQueryResult", businessQueryResultList);
        return result;
    }
}