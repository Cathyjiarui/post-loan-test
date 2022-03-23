package com.finupgroup.postloan.evaluate.controller.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName autoTestContorller
 * @Description 服务器管理页面
 * @Author ZhangJia
 * @Date 2019-09-27 16:33
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "/autoTest")
public class autoTestContorller {

    @GetMapping("serverList")
    public ModelAndView serverList(){
        ModelAndView modelAndView = new ModelAndView("autoTest/serverList");
        return modelAndView;
    }

    @GetMapping("serverInterFace")
    public ModelAndView serverInterFace(String url){
        ModelAndView modelAndView = new ModelAndView("autoTest/serverInterFace");
        modelAndView.addObject("url",url);
        return modelAndView;
    }
}