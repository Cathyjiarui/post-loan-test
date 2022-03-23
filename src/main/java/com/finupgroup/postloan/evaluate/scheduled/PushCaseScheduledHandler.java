package com.finupgroup.postloan.evaluate.scheduled;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.enums.ServiceUser;
import com.finupgroup.postloan.evaluate.entity.mongo.RepayPushCase;
import com.finupgroup.postloan.evaluate.service.mongo.RepayPushCaseRepository;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.service.impl.push.pushTestCaseFactory;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import com.xxl.job.core.log.XxlJobLogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @ClassName PushCaseScheduled
 * @Description 批量推送案件
 * @Author ZhangJia
 * @Date 2019-08-28 18:59
 * @Version 1.0
 **/
@Slf4j
@JobHandler(value = "PushCaseScheduledHandler")
@Component
public class PushCaseScheduledHandler extends IJobHandler {

    @Autowired
    private RepayPushCaseRepository repayPushCaseRepository;

    @Autowired
    private pushTestCaseFactory pushTestCaseFactory;

    @Value("${host.external.url}")
    private String uri;

    @Override
    public ReturnT<String> execute(String param) throws Exception{

        XxlJobLogger.log("Push Test Case Start");
        //声明推送的url
        String url = uri + "/api/v1/case/entrustCaseCollection";
        log.info(url);
        /**
         * 循环遍历个业务线案件
         **/
        for(ServiceUser serviceUser : ServiceUser.values()){
            String relutsMessage = "";
            //step0: 无法确认业务线的跳过
            if(serviceUser.getIndex() == 999){
                continue;
            }
            //step1: 根据渠道查询案件
            List<RepayPushCase> pushCases = repayPushCaseRepository.findAllByServiceUserId(serviceUser.getIndex());
            //step2: 判断渠道案件为空时跳过
            if(pushCases.size() == 0){
                continue;
            }
            //step3: 循环拼装并推送案件
            for(RepayPushCase repayPushCase : pushCases){
                //step4: 拼装案件
                JSONObject jsonObject = repayPushCase.getCaseInfo();
                OverDueVo overDueVo = new OverDueVo();
                overDueVo.setSignedAmount(jsonObject.getBigDecimal("signed_amount"));
                overDueVo.setShopName(jsonObject.getString("shop_name"));
                overDueVo.setRequestId(jsonObject.getString("request_id"));
                overDueVo.setName(jsonObject.getString("user_name"));
                overDueVo.setLendContractCode(jsonObject.getString("contract_code"));
                overDueVo.setIsDeposit(jsonObject.getBoolean("is_deposit"));
                overDueVo.setIdNo(jsonObject.getString("id_no"));
                overDueVo.setCoreRequestId(jsonObject.getLong("core_request_id"));
                overDueVo.setCoreLendCustomerId(jsonObject.getLong("customer_id"));
                overDueVo.setCity(jsonObject.getString("city"));
                overDueVo.setAmount(jsonObject.getBigDecimal("amount"));
                overDueVo.setLoanChannelType(jsonObject.getString("pay_source"));
                //step5: 根据业务线推送案件
                pushTestCase pushTestCase = pushTestCaseFactory.getPushTestCase(serviceUser.getValue());
                relutsMessage = pushTestCase.pushCase(url,overDueVo,serviceUser.getValue());
                log.info("核心ID：{}推送结果为：{}",overDueVo.getCoreRequestId(),relutsMessage);
                //step7: 推案成功后，更新状态
                if("案件委托成功".equals(relutsMessage)){
                    repayPushCaseRepository.updatePushStatusById(repayPushCase.getId());
                }
            }
        }
        XxlJobLogger.log("Push Test Case Over");
        return SUCCESS;
    }
}