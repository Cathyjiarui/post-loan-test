package com.finupgroup.postloan.test;

import com.finupgroup.postloan.evaluate.service.impl.push.pushTestCaseFactory;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class pushCaseTest {

    @Autowired
    private pushTestCaseFactory pushTestCaseFactory;

    @Value("${host.external.url}")
    private String uri;

    @Test
    public void pushTest(){

//        String url = uri + "/api/v1/case/entrustCaseCollection";
        String url = "http://post-loan-external-rest.postloan.test/api/v1/case/entrustCaseCollection";

        OverDueVo overDueVo = new OverDueVo();
        overDueVo.setAmount(BigDecimal.valueOf(30000.00));
        overDueVo.setCity("beijing");
        overDueVo.setCoreLendCustomerId(139827L);
        overDueVo.setCoreRequestId(139757L);
        overDueVo.setIdNo("210502198006078729");
        overDueVo.setIsDeposit(false);
        overDueVo.setLendContractCode("liang10100098811324");
        overDueVo.setName("伍喝死");
        overDueVo.setRequestId("22220000048811324");
        overDueVo.setShopName("北京万达广场门店");
        overDueVo.setSignedAmount(BigDecimal.valueOf(32200.00));
        overDueVo.setLoanChannelType("ONLINE_IQIANJIN");


        pushTestCase pushTestCase = pushTestCaseFactory.getPushTestCase("jiea_online");
        String reslutMessage = pushTestCase.pushCase(url, overDueVo, "jiea_online");
        assertEquals(reslutMessage,"案件委托成功");
    }

}