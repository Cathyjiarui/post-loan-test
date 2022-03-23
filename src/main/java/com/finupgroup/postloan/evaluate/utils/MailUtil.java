package com.finupgroup.postloan.evaluate.utils;

import com.finupgroup.postloan.evaluate.entity.repay.SendMail;
import com.finupgroup.postloan.evaluate.service.repay.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @ClassName MailUtil
 * @Description 邮件服务
 * @Author ZhangJia
 * @Date 2019-06-03 15:53
 * @Version 1.0
 **/
@Slf4j
@Component
@Async
public class MailUtil {

    @Autowired
    private SendMailService sendMailService;

    /**
     *
     * @param content 邮件的正文
     * @return void
     * @Exception 
     **/
    public void sendMail(String content) throws MessagingException{

        //0.获取邮件相关信息
        SendMail sendMail = sendMailService.getSendMail();
        //1.配置发送邮件的属性
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.host", "owa.finupgroup.com");
        properties.setProperty("mail.smtp.auth", "true");
        properties.put("mail.smtp.auth.mechanisms", "NTLM");
        properties.setProperty("mail.smtp.port", "587");
        //2.根据属性获得一个会话
        Session session = Session.getInstance(properties);
        //3.设置会话是debug模式
        session.setDebug(true);
        //4.创建邮件主题信息对象
        MimeMessage message = new MimeMessage(session);
        //5.设置发件人
        message.setFrom(new InternetAddress(sendMail.getSender()));
        //6.设置邮件主题
        message.setSubject("故事提测");
        //7.设置邮件正文
        message.setText(content);
        //8.设置收件人: TO-发送    CC-抄送   BCC-密送
        String toMail = sendMail.getToMails();
        String[] str1 = toMail.split(",");
        Map<String, String> map = new HashMap<>();
        for (int i = 0; i < str1.length; i++) {
            String[] str2 = str1[i].split(":");
            map.put(str2[0],str2[1]);
        }
        log.info("发送邮件的map为:{}",map.toString());
        for (Map.Entry<String, String> entry : map.entrySet()) {
            String email = entry.getKey();
            String type = entry.getValue();
            if ("to".equalsIgnoreCase(type)) {
                message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
            } else if ("cc".equalsIgnoreCase(type)) {
                message.setRecipient(Message.RecipientType.CC, new InternetAddress(email));
            } else if ("bcc".equalsIgnoreCase(type)) {
                message.setRecipient(Message.RecipientType.BCC, new InternetAddress(email));
            }
        }
        //9.获取发送器对象:提供指定的协议
        Transport transport = session.getTransport("smtp");
        //10.设置发件人的信息
        transport.connect(sendMail.getFromMailUserName(),sendMail.getFromMailPassword());
        //11.发送邮件
        transport.sendMessage(message, message.getAllRecipients());
        //12.关闭资源
        transport.close();
    }
}
