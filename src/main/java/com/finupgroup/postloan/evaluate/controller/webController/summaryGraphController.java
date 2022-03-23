package com.finupgroup.postloan.evaluate.controller.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName summaryGraphController
 * @Description 测试报表
 * @Author ZhangJia
 * @Date 2019-07-19 11:22
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "/summaryGraph")
public class summaryGraphController {

    @GetMapping("statusQuo")
    public ModelAndView statusQuo() {
        ModelAndView modelAndView = new ModelAndView("summaryGraph/statusQuo");
        return modelAndView;
    }

    @GetMapping("monthlyStatistics")
    public ModelAndView monthlyStatistics(){
        ModelAndView modelAndView = new ModelAndView("summaryGraph/monthlyStatistics");
        return modelAndView;
    }
}