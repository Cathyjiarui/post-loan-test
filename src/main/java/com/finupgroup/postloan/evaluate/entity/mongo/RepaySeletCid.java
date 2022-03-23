package com.finupgroup.postloan.evaluate.entity.mongo;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * @Author cuishaohua
 * @Date 2019/9/11
 * mongodb库表结构
 */
@Document(collection = "repay_select_core_id")
@Data
public class RepaySeletCid {
    @Id
    private String id;

    @CreatedDate
    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("core_req_id")
    private Long core_req_id;

    @Field("status")
    private Boolean status;
}
