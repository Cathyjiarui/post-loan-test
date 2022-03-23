package com.finupgroup.postloan.test.service;

import com.finupgroup.postloan.evaluate.entity.repay.SendMail;
import com.finupgroup.postloan.evaluate.service.asset.CoreCustomerService;
import com.finupgroup.postloan.evaluate.service.repay.SendMailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @ClassName CoreCustomerServiceTest
 * @Description 测试回去核心用户信息
 * @Author ZhangJia
 * @Date 2019-08-26 15:15
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class CoreCustomerServiceTest {

    @Autowired
    private CoreCustomerService coreCustomerService;

    @Autowired
    private SendMailService sendMailService;

    @Test
    public void getSendMail(){
        SendMail sendMail = sendMailService.getSendMail();
        System.out.println(sendMail.toString());
    }

    @Test
    public void getCoreCustomerByIdTest(){
        System.out.println(coreCustomerService.getCoreCustomerById(1559802683L));
    }
}