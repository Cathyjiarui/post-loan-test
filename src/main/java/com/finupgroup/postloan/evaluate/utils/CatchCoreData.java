package com.finupgroup.postloan.evaluate.utils;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.asset.CoreCustomer;
import com.finupgroup.postloan.evaluate.entity.mongo.RepayPushCase;
import com.finupgroup.postloan.evaluate.service.asset.CoreCustomerService;
import com.finupgroup.postloan.evaluate.service.mongo.RepayPushCaseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Author cuishaohua
 * @Date 2019/8/29
 */

@Slf4j
@Repository
@Component
public class CatchCoreData {

    @Autowired
    private RepayPushCaseRepository repayPushCaseRepository;
    @Autowired
    private OAuth2RestTemplate restTemplate;
    @Autowired
    private CoreCustomerService coreCustomerService;
    @Autowired
    private DataUtil dataUtil;
    @Value("${host.core.url}")
    private String core_url;

    private String url_OverdueInfo = "/api/asset/compliance/v1/repayQuery/queryOverdueInfo/";
    private String url_LendRepayRecord = "/api/core/asset/v1/query/queryAssetInfoByAssetInfoId/";

    //    获取当前案件的逾期状态，判断是否m1
    @Deprecated
    public boolean GetOverDueInfo(Long core_request_id) {

        String rst_OverDueInfo = restTemplate.getForObject(core_url + url_OverdueInfo + core_request_id, String.class);
        JSONObject jsonObject_odi = JSONObject.parseObject(rst_OverDueInfo);
        int transCode = jsonObject_odi.getInteger("transCode");
        if (transCode == 1) {
            int currentOverduePeriods = jsonObject_odi.getInteger("currentOverduePeriods");
            if (currentOverduePeriods == 1) {
                return true;
            }
        }
        return false;
    }

    //    获取推送案件的推送信息
    public void GetCaseInfo(Long core_request_id) {

        String url = core_url + url_LendRepayRecord + core_request_id.toString();
        ResponseEntity <String>
                rst_CaseInfo = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        String rst = rst_CaseInfo.toString();
//        if (rst.contains("null")) {
//            log.info("未查询到资产信息，当前核心id：{}", core_request_id);
//            return;
//        }
        String rst_CI = rst.substring(0, rst.indexOf("},"));

        int one = rst_CI.indexOf("data");
        String Suffix = rst_CI.substring((one + 6), rst_CI.length());

        JSONObject jsonObject = JSONObject.parseObject(String.valueOf(Suffix));
        BigDecimal amount = jsonObject.getBigDecimal("amount");
        BigDecimal signamount = jsonObject.getBigDecimal("signedAmount");
        Long coreLendCustomerId = jsonObject.getLong("customerId");
        String lendContractCode = jsonObject.getString("contractCode");
        String shopName = null;
        if (dataUtil.isEmpty(jsonObject.getString("shopName"))) {
            shopName = "测试";
        } else {
            shopName = jsonObject.getString("shopName");
        }
        String city = null;
        if (dataUtil.isEmpty(jsonObject.getString("city"))) {
            city = "测试";
        } else {
            city = jsonObject.getString("city");
        }
        String requestId = jsonObject.getString("requestId");
        int isDeposit = jsonObject.getInteger("depositType");
        String paySource = jsonObject.getString("payChannel");
        String requestSource = jsonObject.getString("requestChannel");

        CoreCustomer coreCustomer = coreCustomerService.getCoreCustomerById(coreLendCustomerId);
        String id_no = coreCustomer.getIdNo();
        String customerName = coreCustomer.getName();

        Boolean IsDeposit;
        if (isDeposit != 0) {
            IsDeposit = false;
        } else {
            IsDeposit = true;
        }

        JSONObject caseinfo = new JSONObject();
        caseinfo.put("amount", amount);
        caseinfo.put("city", city);
        caseinfo.put("customer_id", coreLendCustomerId);
        caseinfo.put("core_request_id", core_request_id);
        caseinfo.put("id_no", id_no);
        caseinfo.put("is_deposit", IsDeposit);
        caseinfo.put("contract_code", lendContractCode);
        caseinfo.put("user_name", customerName);
        caseinfo.put("request_id", requestId);
        caseinfo.put("shop_name", shopName);
        caseinfo.put("signed_amount", signamount);
        caseinfo.put("pay_source", paySource);

        int ServiceUserId = 999;
        switch (requestSource) {
            case "LEND":
                ServiceUserId = 2;
                break;
            case "LEND_APP":
                ServiceUserId = 3;
                break;
            case "LEND_SUPER":
                ServiceUserId = 2;
                break;
            case "LEND_EXTENSION":
                ServiceUserId = 2;
                break;
            case "JA_SHOP":
                ServiceUserId = 4;
                break;
            case "JA_QZ":
                ServiceUserId = 4;
                break;
            case "JA_QZ_SUPER":
                ServiceUserId = 14;
                break;
            case "JA_TC_API":
                ServiceUserId = 999;
                break;
            case "JA_JS_SUPER":
                ServiceUserId = 14;
                break;
            case "JA_EXTENSION":
                ServiceUserId = 4;
                break;
            case "JA_BRYSX":
                ServiceUserId = 999;
                break;
            case "JA_TCYSX":
                ServiceUserId = 999;
                break;
            case "FAN_XIN":
                ServiceUserId = 999;
                break;
            case "FAN_YIN":
                ServiceUserId = 16;
                break;
            case "FAN_CARD":
                ServiceUserId = 13;
                break;
            case "MLM_DEFER_SUPER":
                ServiceUserId = 15;
                break;
            case "XF_API":
                ServiceUserId = 999;
                break;
            case "SPEED_GOLD":
                ServiceUserId = 999;
                break;
            case "AI_WHITE_STRIP":
                ServiceUserId = 23;
                break;
        }

        log.info(caseinfo.toJSONString());
//        RepayPushCase rpc = new RepayPushCase();
//        rpc.setCaseInfo(caseinfo);
//        rpc.setPushStatus(false);
//        rpc.setUpdateTime(new Date());
//        rpc.setServiceUserId(ServiceUserId);
//        rpc.setCoreRequestId(core_request_id);
//        repayPushCaseRepository.insterPushCase(rpc);
    }
}