package com.finupgroup.postloan.evaluate.controller.tableController;


import com.finupgroup.postloan.evaluate.entity.asset.CoreCustomer;
import com.finupgroup.postloan.evaluate.service.asset.CoreCustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 客户表 前端控制器
 * </p>
 *
 * @author zhangjia
 * @since 2019-08-26
 */
@Slf4j
@RestController
@RequestMapping("/coreCustomer")
public class CoreCustomerController {

    @Autowired
    private CoreCustomerService coreCustomerService;

    @GetMapping("getCoreCustomerById")
    public CoreCustomer getCoreCustomerById(Long id){
        return coreCustomerService.getCoreCustomerById(id);
    }
}
