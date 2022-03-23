package com.finupgroup.postloan.evaluate.service.repay;

import com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 测试任务表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-03-25
 */
public interface RepayTestStoryService extends IService<RepayTestStory> {

    /**
     * 获取未完成的测试任务
     */
    List<RepayTestStory> getNotOverCase(int page,int limit);

    /**
     * 返回故事点总数
     **/
    Long getNotOverCaseCount();

    /**
     * 更新重要程度
     **/
    Integer updateIsImportantById(Long id, Integer isImportant);

    /**
     * 根据ID结束测试任务
     */
    Integer endTestCaseById(Long id);

    /**
     * 领取测试任务
     */
    Integer receiveTestCase(Long id, String testName);

    /**
     * 退回测试任务
     **/
    Integer goBack(Long id);

    /**
     * 根据ID查询测试故事
     */
    RepayTestStory getCaseById(Long id);

    /**
     * 根据ID更新测试故事
     */
    Integer updateCaseById(RepayTestStory repayTestStory);

    /**
     * 插入新测试故事
     */
    Integer insertTestCase(RepayTestStory repayTestStory);

    /**
     * 获取每月数据
     */
    String annualReport();

    /**
     * 获取提测与在测的故事点数量
     */
    String testSituation();

    /**
     * 根据故事编号查询
     **/
    RepayTestStory findTestCaseByAssociationStoryPoint(String associationStoryPoint);
}