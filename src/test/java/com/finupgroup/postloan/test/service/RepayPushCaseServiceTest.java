package com.finupgroup.postloan.test.service;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.mongo.RepayPushCase;
import com.finupgroup.postloan.evaluate.service.mongo.RepayPushCaseRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RepayPushCaseServiceTest {

    @Autowired
    private RepayPushCaseRepository repayPushCaseRepository;

    @Test
    public void findPushCaseById(){
        String id = "5d6cf741709f2baf4a46a232";
        RepayPushCase repayPushCase = repayPushCaseRepository.findPushCaseById(id);
        log.info(repayPushCase.toString());
        Assert.assertEquals("5d6cf741709f2baf4a46a232",repayPushCase.getId());
    }

    @Test
    public void findAllByServiceUserIdTest(){
        Integer serviceUserId = 2;
        List<RepayPushCase> repayPushCases = repayPushCaseRepository.findAllByServiceUserId(serviceUserId);
        for (RepayPushCase repayPushCase : repayPushCases){
            log.info(repayPushCase.toString());
            Assert.assertEquals("2",repayPushCase.getServiceUserId().toString());
        }
    }

    @Test
    public void insterPushCaseTest(){
        RepayPushCase repayPushCase = new RepayPushCase();
        JSONObject caseInfo = new JSONObject();
        caseInfo.put("core_request_id",12342L);
        caseInfo.put("amount",10000);
        caseInfo.put("signed_amount",12000);
        caseInfo.put("customer_id",32123L);
        caseInfo.put("contract_code","123211323132");
        caseInfo.put("shop_name","beijing");
        caseInfo.put("city","beijing");
        caseInfo.put("request_id","12342131");
        caseInfo.put("is_deposit",false);
        caseInfo.put("user_name","zhangjia");
        caseInfo.put("id_no","110101198303060013");
        repayPushCase.setCaseInfo(caseInfo);
        repayPushCase.setPushStatus(false);
        repayPushCase.setServiceUserId(2);
        repayPushCase.setUpdateTime(new Date());
        repayPushCase.setCoreRequestId(12342L);
        repayPushCaseRepository.insterPushCase(repayPushCase);
    }

    @Test
    public void updatePushStatusByIdTest(){
        repayPushCaseRepository.updatePushStatusById("5d64eea9709f2b6cd01a4b65");
    }
}