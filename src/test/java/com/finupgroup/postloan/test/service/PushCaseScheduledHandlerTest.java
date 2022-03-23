package com.finupgroup.postloan.test.service;

import com.finupgroup.postloan.evaluate.scheduled.PushCaseScheduledHandler;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @ClassName PushCaseScheduledHandlerTest
 * @Description 测试类
 * @Author ZhangJia
 * @Date 2019-09-03 13:14
 * @Version 1.0
 **/
@RunWith(SpringRunner.class)
@SpringBootTest
public class PushCaseScheduledHandlerTest {

    @Autowired
    private PushCaseScheduledHandler pushCaseScheduledHandler;

    @Test
    public void executeTest() throws Exception {
        pushCaseScheduledHandler.execute("");
    }
}