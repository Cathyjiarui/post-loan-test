package com.finupgroup.postloan.evaluate.entity.mongo;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * @Author cuishaohua
 * @Date 2019/9/4
 * mongodb库表结构
 */
@Document(collection = "repay_config")
@Data
public class RepayConfig {
    @Id
    private String id;

    @CreatedDate
    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("max_core_req_id")
    private Long max_core_req_id;

    @Field("type")
    private Long type;
}
