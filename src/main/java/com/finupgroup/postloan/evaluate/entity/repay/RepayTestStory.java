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
 * 测试任务表
 * </p>
 *
 * @author zhangjia
 * @since 2019-03-25
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value = "RepayTestStory对象", description = "测试任务表")
public class RepayTestStory implements Serializable {

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

    @ApiModelProperty(value = "测试员名称")
    @TableField("test_name")
    private String testName;

    @ApiModelProperty(value = "Git地址")
    @TableField("git_address")
    private String gitAddress;

    @ApiModelProperty(value = "关联故事点")
    @TableField("association_story_point")
    private String associationStoryPoint;

    @ApiModelProperty(value = "是否领取： 1.已领取 0.未领取", example = "0")
    @TableField("receive")
    private Integer receive;

    @ApiModelProperty(value = "是否结束： 1。已结束 0. 未结束", example = "0")
    @TableField("test_over")
    private Integer testOver;

    @ApiModelProperty(value = "故事内容")
    @TableField("story_content")
    private String storyContent;

    @ApiModelProperty(value = "是否重要: 1.重要 0.非重要")
    @TableField("is_important")
    private Integer isImportant;

}
