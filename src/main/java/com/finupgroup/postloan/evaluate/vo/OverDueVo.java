package com.finupgroup.postloan.evaluate.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@ApiModel(description = "案件信息")
public class OverDueVo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 核心进件号
     */
    @ApiModelProperty(value = "核心进件号")
    private Long coreRequestId;

    /**
     * 放款金额
     */
    @ApiModelProperty(value = "放款金额")
    private BigDecimal amount;

    /**
     * 签约金额
     */
    @ApiModelProperty(value = "签约金额")
    private BigDecimal signedAmount;

    /**
     * 关联的贷款人
     */
    @ApiModelProperty(value = "关联的贷款人")
    private Long coreLendCustomerId;

    /**
     * 合同编号
     */
    @ApiModelProperty(value = "合同编号")
    private String lendContractCode;

    /**
     * 营业部（门店）名称
     */
    @ApiModelProperty(value = "营业部（门店）名称")
    private String shopName;

    /**
     * 城市
     */
    @ApiModelProperty(value = "城市")
    private String city;

    /**
     * 业务id
     */
    @ApiModelProperty(value = "业务id")
    private String requestId;

    /**
     * 托管模式：0表示未托管，1表示托管
     */
    @ApiModelProperty(value = "托管模式")
    private Boolean isDeposit;

    /**
     * 姓名
     */
    @ApiModelProperty(value = "姓名")
    private String name;

    /**
     * 身份证号
     */
    @ApiModelProperty(value = "身份证号")
    private String idNo;

    /**
     * 账户类型
     **/
    @ApiModelProperty(value = "账户类型")
    private String loanChannelType;
}