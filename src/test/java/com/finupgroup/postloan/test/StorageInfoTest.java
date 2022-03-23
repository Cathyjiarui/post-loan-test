package com.finupgroup.postloan.test;

import com.finupgroup.postloan.evaluate.scheduled.StorageInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @Author cuishaohua @Date 2019/9/3
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class StorageInfoTest {
    @Autowired
    private StorageInfo storageInfo;

    @Test
    public void test() throws Exception {
        storageInfo.execute("81264704");
    }
}