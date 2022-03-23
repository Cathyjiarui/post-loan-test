package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory;
import com.finupgroup.postloan.evaluate.entity.repay.SendMail;
import com.finupgroup.postloan.evaluate.mapper.repay.RepayTestStoryMapper;
import com.finupgroup.postloan.evaluate.service.repay.RepayTestStoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.finupgroup.postloan.evaluate.service.repay.SendMailService;
import com.finupgroup.postloan.evaluate.utils.DataUtil;
import com.finupgroup.postloan.evaluate.utils.MailUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.mail.MessagingException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <p>
 * 测试任务表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-03-25
 */
@Slf4j
@Service
public class RepayTestStoryServiceImpl extends ServiceImpl<RepayTestStoryMapper, RepayTestStory> implements RepayTestStoryService {

    @Autowired
    private RepayTestStoryMapper repayTestStoryMapper;

    @Autowired
    private DataUtil dataUtil;

    @Autowired
    private MailUtil mailUtil;

    @Autowired
    private SendMailService sendMailService;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * @return java.util.List<com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory>
     * @Author zhangjia
     * @Description 获取未完成的测试任务
     * @Date 13:20 2019-07-19
     * @Param []
     **/
    @Override
    public List<RepayTestStory> getNotOverCase(int page, int limit) {
        int from = (page - 1) * limit;
        LambdaQueryWrapper<RepayTestStory> lambdaQueryWrapper = new QueryWrapper<RepayTestStory>().lambda();
        lambdaQueryWrapper
                .eq(RepayTestStory::getTestOver, 0)
                .last("limit " + from + "," + limit)
                .orderByDesc(RepayTestStory::getIsImportant)
                .orderByAsc(RepayTestStory::getCreateTime);
        return repayTestStoryMapper.selectList(lambdaQueryWrapper);
    }

    /**
     * @return java.lang.Long
     * @Description 获取未完成的测试任务的总数
     * @Param []
     **/
    @Override
    public Long getNotOverCaseCount() {
        LambdaQueryWrapper<RepayTestStory> lambdaQueryWrapper = new QueryWrapper<RepayTestStory>().lambda();
        lambdaQueryWrapper
                .eq(RepayTestStory::getTestOver, 0);
        return repayTestStoryMapper.selectCount(lambdaQueryWrapper).longValue();
    }

    /**
     * @return java.lang.Integer
     * @Description 更新任务重要程度
     * @Param [id, isImportant]
     **/
    @Override
    public Integer updateIsImportantById(Long id, Integer isImportant) {
        LambdaUpdateWrapper<RepayTestStory> lambdaUpdateWrapper = new UpdateWrapper<RepayTestStory>().lambda();
        lambdaUpdateWrapper
                .eq(RepayTestStory::getId, id)
                .set(RepayTestStory::getIsImportant, isImportant);
        return repayTestStoryMapper.update(new RepayTestStory(), lambdaUpdateWrapper);
    }

    /**
     * @return java.lang.Integer
     * @Author zhangjia
     * @Description 根据ID结束测试任务
     * @Date 14:46 2019-07-19
     * @Param [id]
     **/
    @Override
    public Integer endTestCaseById(Long id) {
        LambdaUpdateWrapper<RepayTestStory> lambdaUpdateWrapper = new UpdateWrapper<RepayTestStory>().lambda();
        lambdaUpdateWrapper
                .eq(RepayTestStory::getId, id)
                .set(RepayTestStory::getTestOver, 1);
        return repayTestStoryMapper.update(new RepayTestStory(), lambdaUpdateWrapper);
    }

    /**
     * @return java.lang.Integer
     * @Author zhangjia
     * @Description 领取测试任务
     * @Date 15:03 2019-07-19
     * @Param [id, testName]
     **/
    @Override
    public Integer receiveTestCase(Long id, String testName) {
        LambdaUpdateWrapper<RepayTestStory> lambdaUpdateWrapper = new UpdateWrapper<RepayTestStory>().lambda();
        lambdaUpdateWrapper
                .eq(RepayTestStory::getId, id)
                .set(RepayTestStory::getReceive, 1)
                .set(RepayTestStory::getTestName, testName);
        return repayTestStoryMapper.update(new RepayTestStory(), lambdaUpdateWrapper);
    }

    /**
     * @return java.lang.Integer
     * @Description 退回测试任务
     * @Param [id]
     **/
    @Override
    public Integer goBack(Long id) {
        LambdaUpdateWrapper<RepayTestStory> lambdaUpdateWrapper = new UpdateWrapper<RepayTestStory>().lambda();
        lambdaUpdateWrapper
                .eq(RepayTestStory::getId, id)
                .set(RepayTestStory::getReceive, 0)
                .set(RepayTestStory::getTestName, null);
        return repayTestStoryMapper.update(new RepayTestStory(), lambdaUpdateWrapper);
    }

    /**
     * @return java.lang.String
     * @Author zhangjia
     * @Description 获取提测与在测的故事点数量
     * @Date 13:33 2019-07-19
     * @Param []
     **/
    @Override
    public String testSituation() {
        JSONObject returnData = new JSONObject();
        //查询提测的案件数
        QueryWrapper<RepayTestStory> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .lambda()
                .eq(RepayTestStory::getReceive, 0)
                .eq(RepayTestStory::getTestOver, 0);
        Integer test = repayTestStoryMapper.selectCount(queryWrapper);

        returnData.put("test", test);
        //查询在测试的案件数
        QueryWrapper<RepayTestStory> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1
                .lambda()
                .eq(RepayTestStory::getReceive, 1)
                .eq(RepayTestStory::getTestOver, 0);
        Integer testing = repayTestStoryMapper.selectCount(queryWrapper1);
        returnData.put("testing", testing);
        return returnData.toJSONString();
    }

    /**
     * @return com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory
     * @Description 根据故事编号查询
     * @Param [associationStoryPoint]
     **/
    @Override
    public RepayTestStory findTestCaseByAssociationStoryPoint(String associationStoryPoint) {
        LambdaQueryWrapper<RepayTestStory> lambdaQueryWrapper = new QueryWrapper<RepayTestStory>().lambda();
        lambdaQueryWrapper
                .eq(RepayTestStory::getReceive, 1)
                .like(RepayTestStory::getAssociationStoryPoint, "%" + associationStoryPoint + "%");
        return repayTestStoryMapper.selectOne(lambdaQueryWrapper);
    }

    /**
     * @return java.lang.String
     * @Author zhangjia
     * @Description 获取每月数据
     * @Date 13:46 2019-07-19
     * @Param []
     **/
    @Override
    public String annualReport() {
        JSONObject returnData = new JSONObject();
        List<String> months = Arrays.asList("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        for (String month : months) {
            switch (month) {
                case "Jan":
                    returnData.put(month, TestCaseCount("01-01 00:00:00", "02-01 00:00:00"));
                    break;
                case "Feb":
                    returnData.put(month, TestCaseCount("02-01 00:00:00", "03-01 00:00:00"));
                    break;
                case "Mar":
                    returnData.put(month, TestCaseCount("03-01 00:00:00", "04-01 00:00:00"));
                    break;
                case "Apr":
                    returnData.put(month, TestCaseCount("04-01 00:00:00", "05-01 00:00:00"));
                    break;
                case "May":
                    returnData.put(month, TestCaseCount("05-01 00:00:00", "06-01 00:00:00"));
                    break;
                case "Jun":
                    returnData.put(month, TestCaseCount("06-01 00:00:00", "07-01 00:00:00"));
                    break;
                case "Jul":
                    returnData.put(month, TestCaseCount("07-01 00:00:00", "08-01 00:00:00"));
                    break;
                case "Aug":
                    returnData.put(month, TestCaseCount("08-01 00:00:00", "09-01 00:00:00"));
                    break;
                case "Sep":
                    returnData.put(month, TestCaseCount("09-01 00:00:00", "10-01 00:00:00"));
                    break;
                case "Oct":
                    returnData.put(month, TestCaseCount("10-01 00:00:00", "11-01 00:00:00"));
                    break;
                case "Nov":
                    returnData.put(month, TestCaseCount("11-01 00:00:00", "12-01 00:00:00"));
                    break;
                case "Dec":
                    returnData.put(month, TestCaseCount("12-01 00:00:00", "12-31 23:59:59"));
                    break;
                default:
                    returnData.put(month, 0);
            }
        }
        return returnData.toJSONString();
    }

    /**
     * @return com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory
     * @Author zhangjia
     * @Description 根据ID查询测试故事
     * @Date 15:16 2019-07-19
     * @Param [id]
     **/
    @Override
    public RepayTestStory getCaseById(Long id) {
        return repayTestStoryMapper.selectById(id);
    }

    /**
     * @return java.lang.Integer
     * @Author zhangjia
     * @Description 根据ID更新测试故事
     * @Date 15:40 2019-07-19
     * @Param [repayTestStory]
     **/
    @Override
    public Integer updateCaseById(RepayTestStory repayTestStory) {
        String StoryContent = dataUtil.decode(repayTestStory.getGitAddress());
        repayTestStory.setStoryContent(dataUtil.InterceptString(StoryContent));
        if ("未领取".equals(repayTestStory.getTestName())) {
            repayTestStory.setTestName(null);
        }
        UpdateWrapper<RepayTestStory> updateWrapper = new UpdateWrapper<>();
        updateWrapper
                .lambda()
                .eq(RepayTestStory::getId, repayTestStory.getId());
        return repayTestStoryMapper.update(repayTestStory, updateWrapper);
    }

    /**
     * @return java.lang.Integer
     * @Author zhangjia
     * @Description 插入新测试故事
     * @Date 16:09 2019-07-19
     * @Param [repayTestStory]
     **/
    @Override
    public Integer insertTestCase(RepayTestStory repayTestStory) {
        Date date = new Date();
        repayTestStory.setCreateTime(date);
        repayTestStory.setUpdateTime(date);
        repayTestStory.setAssociationStoryPoint(String.valueOf(dataUtil.StringExtractLong(repayTestStory.getAssociationStoryPoint())));
        repayTestStory.setAssociationStoryPoint("[" + repayTestStory.getAssociationStoryPoint() + "]");
        String StoryContent = dataUtil.decode(repayTestStory.getGitAddress());
        repayTestStory.setStoryContent(dataUtil.InterceptString(StoryContent));
        int num = repayTestStoryMapper.insert(repayTestStory);
        String text = repayTestStory.getStoryContent() + "提测了";
        try {
            mailUtil.sendMail(text);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return num;
    }

    /**
     * @return java.lang.Integer
     * @Author zhangjia
     * @Description 计算测试故事数量
     * @Date 17:32 2019-07-22
     * @Param [startDate, endDate]
     **/
    public Integer TestCaseCount(String startDate, String endDate) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY");
        String year = simpleDateFormat.format(new Date()) + "-";
        QueryWrapper<RepayTestStory> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .lambda()
                .ge(RepayTestStory::getCreateTime, year + startDate)
                .lt(RepayTestStory::getCreateTime, year + endDate);
        return repayTestStoryMapper.selectCount(queryWrapper);
    }
}