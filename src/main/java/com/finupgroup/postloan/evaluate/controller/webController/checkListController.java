package com.finupgroup.postloan.evaluate.controller.webController;

import com.finupgroup.postloan.evaluate.entity.repay.RepayTestStory;
import com.finupgroup.postloan.evaluate.service.repay.RepayTestStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * @ClassName checkListController
 * @Description 测试故事点
 * @Author ZhangJia
 * @Date 2019-07-19 11:41
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "/checkList")
public class checkListController {

    @Autowired
    private RepayTestStoryService repayTestStoryService;

    @GetMapping("testlist")
    public ModelAndView testlist() {
        ModelAndView modelAndView = new ModelAndView("checklist/testlist");
        return modelAndView;
    }

    @GetMapping("editTestCase")
    public ModelAndView editTestCase(Long id){
        ModelAndView modelAndView = new ModelAndView("checklist/editTestCase");
        RepayTestStory repayTestStory = repayTestStoryService.getCaseById(id);
        modelAndView.addObject("repayTestStory", repayTestStory);
        return modelAndView;
    }

    @GetMapping("addTestCase")
    public ModelAndView addTestCase(){
        ModelAndView modelAndView = new ModelAndView("checklist/addTestCase");
        return modelAndView;
    }
}