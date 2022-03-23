package com.finupgroup.postloan.evaluate.controller.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName IndexController
 * @Description 主页面
 * @Author ZhangJia
 * @Date 2019-05-21 14:12
 * @Version 1.0
 **/
@Controller
public class IndexController {

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @GetMapping("/404")
    public ModelAndView yanfa() {
        ModelAndView modelAndView = new ModelAndView("404");
        return modelAndView;
    }
}