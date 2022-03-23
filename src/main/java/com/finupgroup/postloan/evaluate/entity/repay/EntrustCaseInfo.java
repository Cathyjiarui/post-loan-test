package com.finupgroup.postloan.evaluate.entity.repay;

import com.baomidou.mybatisplus.annotation.IdType;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;

import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 委托案件信息表
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "EntrustCaseInfo对象", description = "委托案件信息表")
public class EntrustCaseInfo implements Serializable {

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

    @ApiModelProperty(value = "案件ID")
    @TableField("case_id")
    private Long caseId;

    @ApiModelProperty(value = "核心进件号")
    @TableField("core_request_id")
    private Long coreRequestId;

    @ApiModelProperty(value = "进件号")
    @TableField("request_id")
    private Long requestId;

    @ApiModelProperty(value = "服务用户ID")
    @TableField("service_user_id")
    private Long serviceUserId;

    @ApiModelProperty(value = "服务用户code")
    @TableField("service_code")
    private String serviceCode;

    @ApiModelProperty(value = "进件信息")
    @TableField("entrust_data")
    private String entrustData;

    @ApiModelProperty(value = "状态(1未处理、2已处理)", example = "1")
    @TableField("info_status")
    private Integer infoStatus;

    @ApiModelProperty(value = "推送日志")
    @TableField("msg")
    private String msg;


}
