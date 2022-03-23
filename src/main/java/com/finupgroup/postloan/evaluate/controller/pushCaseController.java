package com.finupgroup.postloan.evaluate.controller;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.service.impl.push.pushTestCaseFactory;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName pushCaseController
 * @Description 案件推送服务
 * @Author finup
 * @Date 2019-10-14 23:57
 * @Version 1.0
 **/
@Slf4j
@RestController
@RequestMapping(value = "/pushTestCase")
public class pushCaseController {

    @Autowired
    private pushTestCaseFactory pushTestCaseFactory;

    @ApiOperation(value = "推送案件", httpMethod = "POST")
    @ApiImplicitParam(name = "逾期案件信息", value = "逾期案件信息", required = true, dataType = "JSONObject")
    @PostMapping(value = "pushCase")
    public String pushCase(@RequestBody JSONObject data){
        log.info("JSON value is : {}",data);
        String url = data.getString("url") + "/api/v1/case/entrustCaseCollection";
        String serviceCode = data.getString("serviceCode");
        OverDueVo overDueVo = new OverDueVo();
        overDueVo.setLoanChannelType(data.getString("loanChannelType"));
        overDueVo.setAmount(data.getBigDecimal("amount"));
        overDueVo.setCity("beijing");
        overDueVo.setCoreLendCustomerId(data.getLong("coreLendCustomerId"));
        overDueVo.setCoreRequestId(data.getLong("coreRequestId"));
        overDueVo.setIdNo(data.getString("idNo"));
        overDueVo.setIsDeposit(data.getIntValue("IsDeposit") == 1 ? true : false);
        overDueVo.setLendContractCode(data.getString("lendContractCode"));
        overDueVo.setName(data.getString("name"));
        overDueVo.setRequestId(data.getString("requestId"));
        overDueVo.setShopName("北京万达广场门店");
        overDueVo.setSignedAmount(data.getBigDecimal("signedAmount"));
        pushTestCase pushTestCase = pushTestCaseFactory.getPushTestCase(serviceCode);
        return pushTestCase.pushCase(url,overDueVo,serviceCode);
    }
}