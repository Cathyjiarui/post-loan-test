package com.finupgroup.postloan.evaluate.entity.repay;

import java.math.BigDecimal;

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
 * 委外放款件结果表
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-17
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "OutsourceRequestInfoResult对象", description = "委外放款件结果表")
public class OutsourceRequestInfoResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @ApiModelProperty(value = " 创建时间")
    @TableField("create_time")
    private Date createTime;

    @ApiModelProperty(value = "更新时间")
    @TableField("update_time")
    private Date updateTime;

    @ApiModelProperty(value = "核心进件号")
    @TableField("core_lend_request_id")
    private Long coreLendRequestId;

    @ApiModelProperty(value = "剩余未还本金")
    @TableField("unrepay_principal")
    private BigDecimal unrepayPrincipal;

    @ApiModelProperty(value = "一次性结清金额")
    @TableField("square_up_amount")
    private BigDecimal squareUpAmount;

    @ApiModelProperty(value = "所属账单日")
    @TableField("this_due_date")
    private Date thisDueDate;

    @ApiModelProperty(value = "期数", example = "1")
    @TableField("this_phase")
    private Integer thisPhase;

    @ApiModelProperty(value = "分区字段")
    @TableField("dt")
    private Date dt;

    @ApiModelProperty(value = "外部核心进件号")
    @TableField("external_core_request_id")
    private Long externalCoreRequestId;

    @ApiModelProperty(value = "账户体系：1：凡普资产服务；2：任买资产服务；3：任买保理", example = "1")
    @TableField("account_sys_id")
    private Integer accountSysId;

}
