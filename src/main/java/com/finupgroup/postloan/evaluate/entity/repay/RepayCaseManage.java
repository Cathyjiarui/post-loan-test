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
 * 案件表
 * </p>
 *
 * @author zhangjia
 * @since 2019-09-17
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="RepayCaseManage对象", description="案件表")
public class RepayCaseManage implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键Id")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @ApiModelProperty(value = "创建时间")
    @TableField("create_time")
    private Date createTime;

    @ApiModelProperty(value = "更新时间")
    @TableField("update_time")
    private Date updateTime;

    @ApiModelProperty(value = "账户类型（字典）")
    @TableField("account_type")
    private Long accountType;

    @ApiModelProperty(value = "还款日")
    @TableField("bill_date")
    private Integer billDate;

    @ApiModelProperty(value = "当前催收方式（字典）")
    @TableField("collection_methods")
    private Long collectionMethods;

    @ApiModelProperty(value = "案件催收状态（字典）")
    @TableField("collection_status")
    private Long collectionStatus;

    @ApiModelProperty(value = "催收人员ID")
    @TableField("collection_user_id")
    private Long collectionUserId;

    @ApiModelProperty(value = "催收人员姓名")
    @TableField("collection_user_name")
    private String collectionUserName;

    @ApiModelProperty(value = "进件合同编号")
    @TableField("contract_code")
    private String contractCode;

    @ApiModelProperty(value = "客户ID")
    @TableField("customer_id")
    private Long customerId;

    @ApiModelProperty(value = "分配状态: 1:未分配；2:已分配")
    @TableField("distribution_status")
    private Integer distributionStatus;

    @ApiModelProperty(value = "终审结论")
    @TableField("final_trial_desc")
    private String finalTrialDesc;

    @ApiModelProperty(value = "初审结论")
    @TableField("first_trial_desc")
    private String firstTrialDesc;

    @ApiModelProperty(value = "最早逾期还款日")
    @TableField("last_repay_date")
    private Date lastRepayDate;

    @ApiModelProperty(value = "应还期数")
    @TableField("lend_phase")
    private Integer lendPhase;

    @ApiModelProperty(value = "放款金额")
    @TableField("loan_amount")
    private Double loanAmount;

    @ApiModelProperty(value = "放款利息")
    @TableField("loan_interest")
    private Double loanInterest;

    @ApiModelProperty(value = "放款本金")
    @TableField("loan_principal")
    private Double loanPrincipal;

    @ApiModelProperty(value = "借款用途")
    @TableField("loan_purpose")
    private String loanPurpose;

    @ApiModelProperty(value = "月还款额")
    @TableField("monthly_repay")
    private Double monthlyRepay;

    @ApiModelProperty(value = "月综合费率")
    @TableField("monthly_total_rate")
    private Double monthlyTotalRate;

    @ApiModelProperty(value = "当前逾期状态(逾期期数)")
    @TableField("now_overdue_status")
    private Integer nowOverdueStatus;

    @ApiModelProperty(value = "所属机构： REPAY:贷后；LEND:个贷")
    @TableField("organization")
    private String organization;

    @ApiModelProperty(value = "立案逾期状态(逾期期数)")
    @TableField("overdue_status")
    private Integer overdueStatus;

    @ApiModelProperty(value = "当前逾期总额")
    @TableField("overdue_total")
    private Double overdueTotal;

    @ApiModelProperty(value = "工作目标（1：回C，2：结清）")
    @TableField("inhouse_target")
    private Integer inhouseTarget;

    @ApiModelProperty(value = "放款日期")
    @TableField("pass_time")
    private Date passTime;

    @ApiModelProperty(value = "借款期数")
    @TableField("period")
    private Integer period;

    @ApiModelProperty(value = "产品名称")
    @TableField("product_name")
    private String productName;

    @ApiModelProperty(value = "还款情况：1：未偿还；2：部分偿还；3：阶段偿还；4：全部偿还；5：已结清")
    @TableField("repay_status")
    private Integer repayStatus;

    @ApiModelProperty(value = "最后还款情况变动时间")
    @TableField("repay_status_time")
    private Date repayStatusTime;

    @ApiModelProperty(value = "委托方进件ID")
    @TableField("request_id")
    private Long requestId;

    @ApiModelProperty(value = "委托方核心进件ID")
    @TableField("core_request_id")
    private Long coreRequestId;

    @ApiModelProperty(value = "销售员、销售人员")
    @TableField("salespeople")
    private String salespeople;

    @ApiModelProperty(value = "案件来源（委托方）")
    @TableField("service_user_id")
    private Long serviceUserId;

    @ApiModelProperty(value = "签约金额")
    @TableField("signed_amount")
    private Double signedAmount;

    @ApiModelProperty(value = "案件处理状态：1:进行中； 2:结束；")
    @TableField("status")
    private Integer status;

    @ApiModelProperty(value = "门店所属市")
    @TableField("store_city")
    private String storeCity;

    @ApiModelProperty(value = "所属机构、门店ID")
    @TableField("store_id")
    private Long storeId;

    @ApiModelProperty(value = "所属机构、门店名称")
    @TableField("store_name")
    private String storeName;

    @ApiModelProperty(value = "门店所属省")
    @TableField("store_province")
    private String storeProvince;

    @ApiModelProperty(value = "门店所属市")
    @TableField("surplus_principal")
    private Double surplusPrincipal;

    @ApiModelProperty(value = "是否自动划扣")
    @TableField("auto_deduct")
    private Boolean autoDeduct;

    @ApiModelProperty(value = "分案时间")
    @TableField("distribution_date")
    private Date distributionDate;

    @ApiModelProperty(value = "部门ID")
    @TableField("department_id")
    private Long departmentId;

    @ApiModelProperty(value = "初始剩余本金")
    @TableField("init_surplus_principal")
    private Double initSurplusPrincipal;

    @ApiModelProperty(value = "初始逾期总额")
    @TableField("init_overdue_total")
    private Double initOverdueTotal;

    @ApiModelProperty(value = "是否C-M1")
    @TableField("c_m")
    private Boolean cM;

    @ApiModelProperty(value = "后续行动")
    @TableField("follow_up")
    private Long followUp;

    @ApiModelProperty(value = "销售人员id")
    @TableField("seller")
    private Long seller;

    @ApiModelProperty(value = "销售人员姓名")
    @TableField("seller_name")
    private String sellerName;

    @ApiModelProperty(value = "客服人员id")
    @TableField("submiter")
    private Long submiter;

    @ApiModelProperty(value = "客服人员姓名")
    @TableField("submiter_name")
    private String submiterName;

    @ApiModelProperty(value = "销售团队id")
    @TableField("sell_group")
    private Long sellGroup;

    @ApiModelProperty(value = "销售团队名称")
    @TableField("sell_group_name")
    private String sellGroupName;

    @ApiModelProperty(value = "大数据唯一标识")
    @TableField("bigdata_no")
    private String bigdataNo;

    @ApiModelProperty(value = "案件流程标记")
    @TableField("queue_code")
    private String queueCode;

    @ApiModelProperty(value = "委外案件流程标识")
    @TableField("os_queue_code")
    private String osQueueCode;

    @ApiModelProperty(value = "是否是新案")
    @TableField("is_new_case")
    private Boolean isNewCase;

    @ApiModelProperty(value = "拨打类型")
    @TableField("call_type")
    private Integer callType;

    @ApiModelProperty(value = "案件所属账单日")
    @TableField("this_cycle")
    private Date thisCycle;

    @ApiModelProperty(value = "决策码")
    @TableField("decision_code")
    private String decisionCode;

    @ApiModelProperty(value = "决策打分")
    @TableField("decision_score")
    private Double decisionScore;

    @ApiModelProperty(value = "主案件id")
    @TableField("main_id")
    private Long mainId;

    @ApiModelProperty(value = "案件所属来源渠道id")
    @TableField("channel_id")
    private Long channelId;

    @ApiModelProperty(value = "是否特殊队列 1是0否")
    @TableField("is_special_queue")
    private Boolean isSpecialQueue;

    @ApiModelProperty(value = "是否存管账户标记 0：否；1：是")
    @TableField("is_deposit")
    private Boolean isDeposit;

    @ApiModelProperty(value = "是否委外案件 0 否 1是")
    @TableField("is_outsourcing")
    private Integer isOutsourcing;

    @ApiModelProperty(value = "是否为欺诈账户 1是 0否")
    @TableField("is_fraud")
    private Integer isFraud;

    @ApiModelProperty(value = "openLine是否需要页面标签(0:不需要;1:需要;)")
    @TableField("new_case_flag")
    private Integer newCaseFlag;

    @ApiModelProperty(value = "轻度逾期结束时间")
    @TableField("light_over_due_end_date")
    private Date lightOverDueEndDate;

    @ApiModelProperty(value = "是否轻度逾期")
    @TableField("is_light_over_due")
    private Boolean isLightOverDue;

    @ApiModelProperty(value = "承诺还款时间（记录最后一次）")
    @TableField("ptp_time")
    private Date ptpTime;

    @ApiModelProperty(value = "特殊委外案件标识 1是 0否")
    @TableField("special_outsrc_id")
    private Long specialOutsrcId;

    @ApiModelProperty(value = "账户类型")
    @TableField("loan_channel_type")
    private String loanChannelType;

    @ApiModelProperty(value = "签约时间")
    @TableField("signed_date")
    private Date signedDate;

    @ApiModelProperty(value = "分配状态，0未分配，1分配给上海，2分配给合肥，3、分配给个贷门店,4 、案件分配到成都 5、 案件分配到北京 6、案件分配到成都集团")
    @TableField("allocation_status")
    private Integer allocationStatus;

    @ApiModelProperty(value = "是否更新轻度催收的时间（更新为7天）,默认否")
    @TableField("whether_upd_light_date")
    private Integer whetherUpdLightDate;

    @ApiModelProperty(value = "知识图谱预测式评分值（案件标识）")
    @TableField("ma_prediction")
    private Integer maPrediction;

    @ApiModelProperty(value = "知识图谱预测式评分值（处理标识）")
    @TableField("handle_prediction")
    private Integer handlePrediction;

    @ApiModelProperty(value = "是否特殊提前委外")
    @TableField("is_advanceOut")
    private Boolean isAdvanceout;

    @ApiModelProperty(value = "c卡分级标签")
    @TableField("label")
    private Integer label;

    @ApiModelProperty(value = "c卡分数")
    @TableField("score")
    private Integer score;

    @ApiModelProperty(value = "特殊结清资格 0:初始化 1:有资格 2:无资格")
    @TableField("special_settle_qualification")
    private Integer specialSettleQualification;

    @ApiModelProperty(value = "c卡2.0分级标签")
    @TableField("label2")
    private Integer label2;

    @ApiModelProperty(value = "c卡2.0分数")
    @TableField("score2")
    private Integer score2;

    @ApiModelProperty(value = "0:内催 1:资易通回退委外 2:资易通结清委外")
    @TableField("out_sourcing_allocation_status")
    private Integer outSourcingAllocationStatus;

    @ApiModelProperty(value = "流入时间c-m1时间")
    @TableField("inflow_time")
    private Date inflowTime;

    @ApiModelProperty(value = "展期状态 0 未申请展期 1 结清展期已申请，展期已放款，未结清 2 结清展期已申请，展期未放款，未结清 3 其他")
    @TableField("extension_flag")
    private Integer extensionFlag;

    @ApiModelProperty(value = "案件生命周期id")
    @TableField("case_report_id")
    private Long caseReportId;

    @ApiModelProperty(value = "案件优先级 1 高 2中 3低 ")
    @TableField("case_level")
    private Boolean caseLevel;

    @ApiModelProperty(value = "m2Old抽取内催:0待处理、1内催、2委外")
    @TableField("m2_old_extraction")
    private Integer m2OldExtraction;

    @ApiModelProperty(value = "催收记录时间")
    @TableField("collection_record_time")
    private Date collectionRecordTime;

    @ApiModelProperty(value = "案件集的流转记录id")
    @TableField("case_unit_flow_id")
    private Long caseUnitFlowId;

    @ApiModelProperty(value = "客群id")
    @TableField("customer_group_id")
    private Long customerGroupId;

    @ApiModelProperty(value = "是否门店留案")
    @TableField("keep_in_store")
    private Boolean keepInStore;

    @ApiModelProperty(value = "钒卡案件id")
    @TableField("fancard_id")
    private Long fancardId;

    @ApiModelProperty(value = "所属催收方式")
    @TableField("collection_mode_id")
    private Long collectionModeId;

    @ApiModelProperty(value = "策略id")
    @TableField("strategy_id")
    private Long strategyId;

    @ApiModelProperty(value = "策略开始日期")
    @TableField("strategy_begin_date")
    private Date strategyBeginDate;

    @ApiModelProperty(value = "策略结束日期")
    @TableField("strategy_end_date")
    private Date strategyEndDate;

    @TableField("strategy_task")
    private Boolean strategyTask;

    @ApiModelProperty(value = "策略code代码")
    @TableField("strategy_code")
    private String strategyCode;

    @ApiModelProperty(value = "客群组与部门分流比ID")
    @TableField("dept_prorate_id")
    private Long deptProrateId;

    @ApiModelProperty(value = "案件包ID")
    @TableField("kase_package_id")
    private Long kasePackageId;

    @ApiModelProperty(value = "最后回退时间")
    @TableField("last_rollback_time")
    private Date lastRollbackTime;


}
