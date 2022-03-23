package com.finupgroup.postloan.evaluate.entity.repay;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 发送邮件信息表
 * </p>
 *
 * @author zhangjia
 * @since 2021-01-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "SendMail对象", description = "发送邮件信息表")
public class SendMail implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键ID")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @ApiModelProperty(value = "创建时间")
    @TableField("create_time")
    private Date createTime;

    @ApiModelProperty(value = "更新时间")
    @TableField("update_time")
    private Date updateTime;

    @ApiModelProperty(value = "发送邮件账户的用户名")
    @TableField("from_mail_user_name")
    private String fromMailUserName;

    @ApiModelProperty(value = "发送邮件账户的密码")
    @TableField("from_mail_password")
    private String fromMailPassword;

    @ApiModelProperty(value = "发件人")
    @TableField("Sender")
    private String Sender;

    @ApiModelProperty(value = "收件人信息")
    @TableField("to_mails")
    private String toMails;
}