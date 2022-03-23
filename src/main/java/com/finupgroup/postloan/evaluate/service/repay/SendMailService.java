package com.finupgroup.postloan.evaluate.service.repay;

import com.baomidou.mybatisplus.extension.service.IService;
import com.finupgroup.postloan.evaluate.entity.repay.SendMail;

/**
 * @ClassName SendMailService
 * @Description 发送邮件信息表
 * @Author ZhangJia
 * @Date 2021/1/8
 * @Version 1.0
 **/
public interface SendMailService extends IService<SendMail> {

    /**
     * 获取发送邮件信息表信息
     */
    SendMail getSendMail();
}
