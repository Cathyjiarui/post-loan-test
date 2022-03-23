package com.finupgroup.postloan.evaluate.controller.moker;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.io.Serializable;

@Data
public class BasicVo implements Serializable {

    private String businessQueryName;

    private String clientId;

    private String requestId;

    private JSONObject businessQueryParameter;

}
