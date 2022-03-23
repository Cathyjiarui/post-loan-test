package com.finupgroup.postloan.test;

import com.finupgroup.postloan.evaluate.scheduled.PreCoreId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @Author cuishaohua
 * @Date 2019/11/8
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class coreDataTest {
    @Autowired
    private PreCoreId PreCoreId;

    @Test
    public void test() throws Exception {
        PreCoreId.execute("1");
    }
}