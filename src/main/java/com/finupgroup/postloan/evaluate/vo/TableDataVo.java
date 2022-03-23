package com.finupgroup.postloan.evaluate.vo;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @ClassName TableDataVo
 * @Description 页面返回信息
 * @Author ZhangJia
 * @Date 2019-09-27 19:51
 * @Version 1.0
 **/
@Data
public class TableDataVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer code;

    private String msg;

    private Long count;

    private List<?> data;
}