package com.finupgroup.postloan.evaluate.entity.mongo;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * <p>
 * 案件推送表
 * </p>
 *
 * @author zhangjia
 * @since 2019-08-26
 */
@Document(collection = "repay_push_case")
@Data
public class RepayPushCase {

    @Id
    private String id;

    @CreatedDate
    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("service_user_id")
    private Integer serviceUserId;

    @Field("push_status")
    private Boolean pushStatus;

    @Field("core_request_id")
    private Long coreRequestId;

    @Field("caseInfo")
    private JSONObject caseInfo;

}