package com.finupgroup.postloan.evaluate.controller.tableController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory;
import com.finupgroup.postloan.evaluate.service.repay.RepayTestStoryService;
import com.finupgroup.postloan.evaluate.vo.TableDataVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 测试任务表 前端控制器
 * </p>
 *
 * @author zhangjia
 * @since 2019-07-05
 */
@Slf4j
@RestController
@RequestMapping("/repayTestStory")
public class RepayTestStoryController {

    @Autowired
    private RepayTestStoryService repayTestStoryService;

    @GetMapping(value = "testSituation")
    public String testSituation(){
        return repayTestStoryService.testSituation();
    }

    @GetMapping(value = "annualReport")
    public String annualReport(){
        return repayTestStoryService.annualReport();
    }

    @PostMapping("updateCase")
    public Integer updateCase(@RequestBody RepayTestStory repayTestStory){
        log.info("更新的测试故事ID为：" + repayTestStory.getId());
        return repayTestStoryService.updateCaseById(repayTestStory);
    }

    @PostMapping("insertCase")
    public Integer insertCase(@RequestBody RepayTestStory repayTestStory){
        log.info(JSON.toJSONString(repayTestStory));
        return repayTestStoryService.insertTestCase(repayTestStory);
    }

    @GetMapping("openTestList")
    public TableDataVo openTestList(@RequestParam(value = "page") int page, @RequestParam(value = "limit") int limit){
        //时间格式化
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //初始化返回值
        TableDataVo tableDataVo = new TableDataVo();
        tableDataVo.setCode(0);
        tableDataVo.setMsg("");
        tableDataVo.setCount(repayTestStoryService.getNotOverCaseCount());
        List<RepayTestStory> repayTestStories = repayTestStoryService.getNotOverCase(page,limit);
        List<JSONObject> data = new ArrayList<>();
        for (RepayTestStory repayTestStory : repayTestStories){

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",repayTestStory.getId());
            jsonObject.put("createTime",simpleDateFormat.format(repayTestStory.getCreateTime()));
            jsonObject.put("storyContent",repayTestStory.getStoryContent());
            jsonObject.put("testName",repayTestStory.getTestName());
            jsonObject.put("associationStoryPoint",repayTestStory.getAssociationStoryPoint());
            jsonObject.put("gitAddress",repayTestStory.getGitAddress());
            jsonObject.put("receive",repayTestStory.getReceive());
            jsonObject.put("isImportant",repayTestStory.getIsImportant());
            data.add(jsonObject);
        }
        tableDataVo.setData(data);
        return tableDataVo;
    }

    @GetMapping("updateIsImportantById")
    public Integer updateIsImportantById(@RequestParam(value = "id") Long id, @RequestParam(value = "isImportant") Integer isImportant){
        return repayTestStoryService.updateIsImportantById(id,isImportant);
    }

    @GetMapping("endTestCaseById")
    public Integer endTestCaseById(@RequestParam(value = "id") Long id){
        log.info("关闭测试故事点的id为：" + id);
        return repayTestStoryService.endTestCaseById(id);
    }

    @GetMapping("receiveTestCase")
    public Integer receiveTestCase(@RequestParam(value = "id") Long id, @RequestParam(value = "testName") String testName){
        log.info("领取故事点ID为：" + id);
        log.info("领取人为：" + testName);
        return repayTestStoryService.receiveTestCase(id,testName);
    }

    @GetMapping("goBack")
    public Integer goBack(@RequestParam(value = "id") Long id){
        log.info("退回的故事点为：{}",id);
        return repayTestStoryService.goBack(id);
    }

    @GetMapping("findTestCaseByAssociationStoryPoint")
    public RepayTestStory findTestCaseByAssociationStoryPoint(@RequestParam(value = "associationStoryPoint") String associationStoryPoint){
        log.info("查询的故事编号为：{}",associationStoryPoint);
        return repayTestStoryService.findTestCaseByAssociationStoryPoint(associationStoryPoint);
    }
}