package com.finupgroup.postloan.test.service;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayServerList;
import com.finupgroup.postloan.evaluate.service.mongo.RepayServerListRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

/**
 * @ClassName RepayServerListRepositoryTest
 * @Description 测试类
 * @Author ZhangJia
 * @Date 2019-09-24 22:28
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RepayServerListRepositoryTest {

    @Autowired
    private RepayServerListRepository repayServerListRepository;

    @Test
    public void insterServerListTest(){
        RepayServerList repayServerList = new RepayServerList();
        repayServerList.setCreateTime(new Date());
        repayServerList.setUpdateTime(new Date());
        repayServerList.setServerAddress("http://post-loan-external-rest.postloan.test");
        repayServerList.setIsOpen(true);
        repayServerListRepository.insterServerList(repayServerList);
    }

    @Test
    public void getAll(){
        List<RepayServerList> repayServerLists = repayServerListRepository.getServerList(10,0);
        System.out.println(repayServerLists.toString());
    }
}