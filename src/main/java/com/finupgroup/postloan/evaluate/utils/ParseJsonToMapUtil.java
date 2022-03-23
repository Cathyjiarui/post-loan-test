package com.finupgroup.postloan.evaluate.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.vo.InterFaceVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName ParseJsonToMapUtil
 * @Description JSON处理工具
 * @Author ZhangJia
 * @Date 2019-10-09 17:39
 * @Version 1.0
 **/
@Slf4j
@Repository
public class ParseJsonToMapUtil {

    /**
     * 返回值转为Map存储
     **/
    private  Map<String, String> iResponJsonToMap = new HashMap<String, String>();

    /**
     * @Description 判断入参是否为json格式的字符串类型
     * @Param [jsonString]
     * @return boolean
     **/
    public boolean isJsonString(String jsonString){
        boolean flag = true;
        try {
            JSON.parseObject(jsonString);
        }catch (Exception e){
            flag = false;
        }
        return flag;
    }
    
    /**
     * @Description 判断入参是否为JSONArray类型
     * @Param [jsonArrayString]
     * @return boolean
     **/
    public boolean isJsonArray(String jsonArrayString){
        boolean flag = true;
        try {
            JSON.parseArray(jsonArrayString);
        }catch (Exception e){
            flag = false;
        }
        return flag;
    }

    /**
     * @Description 非JsonObject,非JsonArray类型
     * @Param [str]
     * @return boolean
     **/
    public boolean isString(String str){
        return !isJsonString(str) && !isJsonArray(str);
    }

    /**
     * @Description 解析JsonArray
     * @Param [jsonArrayString]
     * @return void
     **/
    public void parseJsonArray(String jsonArrayString){
        try{
            JSONArray jsonArray = JSONArray.parseArray(jsonArrayString);
            for(Object json:jsonArray){
                String jsonItem = json.toString();
                if(isJsonString(jsonItem)){
                    parseJsonToMap(jsonItem);
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public Map<String,String> parseJsonToMap(String responseJson){
        try {
            JSONObject jsonObject = JSON.parseObject(responseJson);
            for (Map.Entry<String,Object> entry : jsonObject.entrySet()){
                /**
                 * 只能得到json第1层key,value(value有可能是:基本数据类型,类集,JSONObject,JSONArray)
                 **/
                String key = entry.getKey();
                String value = String.valueOf(entry.getValue());
                iResponJsonToMap.put(key,value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return iResponJsonToMap;
    }

    public List<InterFaceVo> resultToList(String result){
        List<InterFaceVo> resultList = new ArrayList<>();
        //替换特殊字符
        result = result.replace("#","");
        result = result.replace("$","");
        //step1: String转换Json
        JSONObject resultJson = JSON.parseObject(result);
        //step2: 提取paths的值
        JSONObject paths = JSON.parseObject(resultJson.get("paths").toString());
        log.info("paths value is : {}",JSON.toJSONString(paths));
        //step3: 提取definitions的值
        JSONObject definitions = JSON.parseObject(resultJson.get("definitions").toString());
        log.info("definitions value is : {}",JSON.toJSONString(definitions));
        for (Map.Entry<String, Object> entry : paths.entrySet()){
            InterFaceVo interFaceVo = new InterFaceVo();
//            JSONObject jsonObject = new JSONObject();
            //step4: 添加serverAddress
            interFaceVo.setServerAddress(entry.getKey());
//            jsonObject.put("serverAddress",entry.getKey());
            JSONObject requestMethod = JSON.parseObject(entry.getValue().toString());
            for (Map.Entry<String,Object> entry1 : requestMethod.entrySet()){
                //step5: 添加requestMethod
                switch (entry1.getKey()){
                    case "get":
                        interFaceVo.setRequestMethod("GET");
//                        jsonObject.put("requestMethod","GET");
                        break;
                    case "post":
                        interFaceVo.setRequestMethod("POST");
//                        jsonObject.put("requestMethod","POST");
                        break;
                    case "put":
                        interFaceVo.setRequestMethod("PUT");
//                        jsonObject.put("requestMethod","PUT");
                        break;
                    case "delete":
                        interFaceVo.setRequestMethod("DELETE");
//                        jsonObject.put("requestMethod","DELETE");
                        break;
                        default:
                            interFaceVo.setRequestMethod("NOT");
//                            jsonObject.put("requestMethod","NOT");
                }
                JSONObject other = JSON.parseObject(entry1.getValue().toString());
                log.info("othen valus is : {}",other);
                //step6:添加interFaceRemarks
                interFaceVo.setInterFaceRemarks(other.getString("summary"));
//                jsonObject.put("interFaceRemarks",other.getString("summary"));
            }
            resultList.add(interFaceVo);
        }
        return resultList;
    }
}