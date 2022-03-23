package com.finupgroup.postloan.evaluate.controller;

import com.finupgroup.postloan.evaluate.utils.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName dataProcessingController
 * @Description 测试数据
 * @Author ZhangJia
 * @Date 2019-07-22 22:12
 * @Version 1.0
 **/
@Slf4j
@RestController
@RequestMapping("/dataProcessing")
public class dataProcessingController {

    @Autowired
    private DataUtil dataUtil;

    @GetMapping("encrypt")
    public String encrypt(String encrypt){
        return dataUtil.encrypt(encrypt);
    }

    @GetMapping("decipher")
    public String decipher(String decipher){
        return dataUtil.decipher(decipher);
    }
}