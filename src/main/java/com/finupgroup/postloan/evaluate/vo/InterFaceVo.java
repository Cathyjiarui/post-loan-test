package com.finupgroup.postloan.evaluate.vo;

import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @ClassName InterFaceVo
 * @Description swagger返回
 * @Author ZhangJia
 * @Date 2019-10-24 15:26
 * @Version 1.0
 **/
@Data
@ApiModel(description = "swagger返回接口信息")
public class InterFaceVo implements Serializable {

    private static final long serialVersionUID = 2L;

    /**
     * 接口标签
     */
    @ApiModelProperty(value = "接口标签")
    private String tags;

    /**
     * 请求方式
     */
    @ApiModelProperty(value = "请求方式")
    private String requestMethod;

    /**
     * 请求地址
     **/
    @ApiModelProperty(value = "请求地址")
    private String serverAddress;

    /**
     * 接口说明
     **/
    @ApiModelProperty(value = "接口说明")
    private String interFaceRemarks;

    /**
     * 请求参数
     **/
    @ApiModelProperty(value = "请求参数")
    private List<JSONObject> parameter;

    /**
     * 返回信息
     **/
    @ApiModelProperty(value = "返回信息")
    private JSONObject responseMsg;
}