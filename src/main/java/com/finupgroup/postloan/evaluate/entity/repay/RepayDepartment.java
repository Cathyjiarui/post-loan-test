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
 * 部门管理表
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "RepayDepartment对象", description = "部门管理表")
public class RepayDepartment implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键id")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @ApiModelProperty(value = "创建时间")
    @TableField("create_time")
    private Date createTime;

    @ApiModelProperty(value = "修改时间")
    @TableField("update_time")
    private Date updateTime;

    @ApiModelProperty(value = "部门编号")
    @TableField("highcharts")
    private String code;

    @ApiModelProperty(value = "删除标记1删除")
    @TableField("delete_flag")
    private Boolean deleteFlag;

    @ApiModelProperty(value = "部门名称")
    @TableField("name")
    private String name;

    @ApiModelProperty(value = "父部门id")
    @TableField("parent_id")
    private Long parentId;

    @ApiModelProperty(value = "uc组织部门id")
    @TableField("uc_org_id")
    private Long ucOrgId;

    @ApiModelProperty(value = "技能组", example = "1")
    @TableField("skill_group")
    private Integer skillGroup;


}
