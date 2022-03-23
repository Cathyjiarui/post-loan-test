package com.finupgroup.postloan.test;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.scheduled.PreCoreId;
import com.finupgroup.postloan.evaluate.service.impl.mongo.CoreDataBaseRepositoryImpl;
import com.finupgroup.postloan.evaluate.utils.CatchCoreData;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @ClassName CatchCoreDataTest
 * @Description TODO
 * @Author ZhangJia
 * @Date 2020/10/9
 * @Version 1.0
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class CatchCoreDataTest {

    @Autowired
    private CatchCoreData catchCoreData;


    @Autowired
    private PreCoreId preCoreId;

    @Test
    public void GetCaseInfoTest(){
        catchCoreData.GetCaseInfo(219386736612302L);
    }

    @Test
    public void test(){
        try {
            preCoreId.execute("");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
