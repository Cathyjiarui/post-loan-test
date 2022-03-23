package com.finupgroup.postloan.evaluate.entity.mongo;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * @ClassName RepayKaseTag
 * @Description 案件标签
 * @Author ZhangJia
 * @Date 2019-09-18 11:11
 * @Version 1.0
 **/
@Document(collection = "repay_kase_tag")
@Data
public class RepayKaseTag {

    @Id
    private String id;

    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("kase_id")
    private Long kaseId;

    @Field("removed")
    private Boolean removed;

    @Field("tag_group")
    private String tagGroup;

    @Field("source")
    private Integer source;

    @Field("channel")
    private Integer channel;

    @Field("tagInfo")
    private JSONObject tagInfo;
}