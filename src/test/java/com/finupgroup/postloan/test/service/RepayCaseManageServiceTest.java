package com.finupgroup.postloan.test.service;

import com.finupgroup.postloan.evaluate.entity.repay.RepayCaseManage;
import com.finupgroup.postloan.evaluate.service.repay.RepayCaseManageService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * @ClassName RepayCaseManageServiceTest
 * @Description 测试类
 * @Author ZhangJia
 * @Date 2019-09-18 10:36
 * @Version 1.0
 **/
@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RepayCaseManageServiceTest {

    @Autowired
    private RepayCaseManageService repayCaseManageService;

    @Test
    public void getOpenLQCaseTest(){
        List<RepayCaseManage> repayCaseManages = repayCaseManageService.getOpenLQCase();
        System.out.println(repayCaseManages.size());
    }

    @Test
    public void nullCustomerGroupIdByIdTest(){
        System.out.println(repayCaseManageService.nullCustomerGroupIdById(9264905L));
    }
}