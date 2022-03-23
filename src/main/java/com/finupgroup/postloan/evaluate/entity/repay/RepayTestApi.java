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
 * 测试接口表
 * </p>
 *
 * @author zhangjia
 * @since 2019-05-06
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "RepayTestApi对象", description = "测试接口表")
public class RepayTestApi implements Serializable {

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

    @ApiModelProperty(value = "测试服务ID")
    @TableField("test_server_id")
    private Long testServerId;

    @ApiModelProperty(value = "接口名称")
    @TableField("api_name")
    private String apiName;

    @ApiModelProperty(value = "接口地址")
    @TableField("api_adress")
    private String apiAdress;

    @ApiModelProperty(value = "请求方式")
    @TableField("request_manner")
    private String requestManner;

    @ApiModelProperty(value = "所属Controller")
    @TableField("belong_controller")
    private String belongController;

    @ApiModelProperty(value = "是否生效： 1.生效 0.失效", example = "1")
    @TableField("receive")
    private Integer receive;

}
