package com.finupgroup.postloan.evaluate.controller.moker;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.utils.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @ClassName ccardController
 * @Description mokerC卡打分服务
 * @Author ZhangJia
 * @Date 2019-09-22 00:29
 * @Version 1.0
 **/
@Slf4j
@RestController
@RequestMapping("/api/ccard")
public class ccardController {

    @Autowired
    private DataUtil dataUtil;

    @PostMapping(value = "cCardData")
    public JSONObject cCardData(@RequestBody String data){
        log.info(data);
        //初始化返回值
        JSONObject resultJson = new JSONObject();
        //声明finalTag的list
        List<String> finalTag = Arrays.asList("GOOD","BAD");
        //声明返回值中的json
        List<JSONObject> result = new ArrayList<>();
        //返回json赋值
        resultJson.put("duration",1);
        resultJson.put("reponseTime",System.currentTimeMillis());
        resultJson.put("resultCode","SUCCESS");
        //获取请求中的核心客户列表
        String coreLendRequestIds = JSON.parseObject(data).getString("coreId");
        //String转List
        List<String> coreLendRequestIdList = dataUtil.stringToList(coreLendRequestIds);
        //循环添加list中的各核心客户号的返回的信息
        for(String coreLendRequestId : coreLendRequestIdList){
            JSONObject ccardJson = new JSONObject();
            ccardJson.put("coreLendRequestId",Long.valueOf(coreLendRequestId));
            ccardJson.put("dt","");
            Random rand = new Random();
            ccardJson.put("finalTag",finalTag.get(rand.nextInt(finalTag.size())));
            ccardJson.put("probability",0.0);
            result.add(ccardJson);
        }
        resultJson.put("result",result);
        return resultJson;
    }
}