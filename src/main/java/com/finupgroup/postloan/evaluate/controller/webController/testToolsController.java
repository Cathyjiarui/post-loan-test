package com.finupgroup.postloan.evaluate.controller.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName testToolsController
 * @Description 测试工具
 * @Author ZhangJia
 * @Date 2019-07-22 19:14
 * @Version 1.0
 **/
@Controller
@RequestMapping(value = "/testTools")
public class testToolsController {

    @GetMapping("dataEncryption")
    public ModelAndView dataEncryption(){
        ModelAndView modelAndView = new ModelAndView("testTools/dataEncryption");
        return modelAndView;
    }

    @GetMapping("coreDataPosition")
    public ModelAndView coreDataPosition(){
        ModelAndView modelAndView = new ModelAndView("testTools/coreDataPosition");
        return modelAndView;
    }

    @GetMapping("findCoreCustomer")
    public ModelAndView findCoreCustomer(){
        ModelAndView modelAndView = new ModelAndView("testTools/findCoreCustomer");
        return modelAndView;
    }

    @GetMapping("pushTestCase")
    public ModelAndView pushTestCase(){
        ModelAndView modelAndView = new ModelAndView("testTools/pushTestCase");
        return modelAndView;
    }
}