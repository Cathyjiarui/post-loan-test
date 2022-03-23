package com.finupgroup.postloan.evaluate.entity.mongo;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * @Author cuishaohua
 * @Date 2019/10/31
 * mongodb库表结构
 */
@Document(collection = "core_database")
@Data
public class CoreDataBase {
    @Id
    private String id;

    @CreatedDate
    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("asset")
    private String asset;

    @Field("asset_info")
    private String asset_info;

    @Field("state")
    private String state;
}

