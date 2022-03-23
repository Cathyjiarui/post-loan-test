package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.finupgroup.postloan.evaluate.entity.repay.SendMail;
import com.finupgroup.postloan.evaluate.mapper.repay.SendMailMapper;
import com.finupgroup.postloan.evaluate.service.repay.SendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName SendMailServiceImpl
 * @Description 发送邮件信息实现类
 * @Author ZhangJia
 * @Date 2021/1/8
 * @Version 1.0
 **/
@Service
public class SendMailServiceImpl extends ServiceImpl<SendMailMapper,SendMail> implements SendMailService {

    @Autowired
    private SendMailMapper sendMailMapper;

    @Override
    public SendMail getSendMail() {
        return sendMailMapper.selectOne(new LambdaQueryWrapper<>());
    }
}
