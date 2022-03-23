package com.finupgroup.postloan.test.service;

import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.mongo.RepayKaseTag;
import com.finupgroup.postloan.evaluate.entity.repay.RepayCaseManage;
import com.finupgroup.postloan.evaluate.service.mongo.RepayKaseTagRepository;
import com.finupgroup.postloan.evaluate.service.repay.RepayCaseManageService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

/**
 * @ClassName RepayKaseTagRepositoryTest
 * @Description 测试类
 * @Author ZhangJia
 * @Date 2019-09-18 14:22
 * @Version 1.0
 **/
@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RepayKaseTagRepositoryTest {

    @Autowired
    private RepayKaseTagRepository repayKaseTagRepository;

    @Autowired
    private RepayCaseManageService repayCaseManageService;

    @Test
    public void insterKaseTag(){

        List<RepayCaseManage> repayCaseManages = repayCaseManageService.getOpenLQCase();
        if(!repayCaseManages.isEmpty()){
            for (RepayCaseManage repayCaseManage : repayCaseManages){
                RepayKaseTag repayKaseTag = new RepayKaseTag();
                repayKaseTag.setCreateTime(new Date());
                repayKaseTag.setUpdateTime(new Date());
                repayKaseTag.setChannel(Integer.valueOf(repayCaseManage.getServiceUserId().toString()));
                repayKaseTag.setSource(Integer.valueOf(repayCaseManage.getChannelId().toString()));
                repayKaseTag.setTagGroup("C_M1");
                repayKaseTag.setRemoved(false);
                repayKaseTag.setKaseId(repayCaseManage.getId());
                JSONObject tagInfo = new JSONObject();
                tagInfo.put("c_m1_status",true);
                tagInfo.put("initial_overdue_status",false);
                tagInfo.put("current_overdue_phrase",repayCaseManage.getNowOverdueStatus());
                tagInfo.put("lastColl_cm1_toc_org_code","P_RPA7520201");
                tagInfo.put("lastColl_cm1_toc_org_type","LEND_REPAY");
                tagInfo.put("lastColl_cm1_toc_allocation",3);
                tagInfo.put("lastColl_toc_org_code","P_RPA7520201");
                tagInfo.put("lastColl_toc_org_type","LEND_REPAY");
                tagInfo.put("lastColl_toc_allocation",3);
                tagInfo.put("store_status","NORMAL");
                tagInfo.put("previous_advanced_toc_status",false);
                tagInfo.put("previous_bill_overdue_status",false);
                tagInfo.put("service_user_id",Integer.valueOf(repayCaseManage.getServiceUserId().toString()));
                tagInfo.put("current_level","C_M");
                tagInfo.put("specified_group","AGENT_OTO");
                repayKaseTag.setTagInfo(tagInfo);
                repayKaseTagRepository.insterKaseTag(repayKaseTag);
                repayCaseManageService.nullCustomerGroupIdById(repayCaseManage.getId());
                log.info("插入案件{}标签成功！",repayCaseManage.getId());
            }
        }
    }
}