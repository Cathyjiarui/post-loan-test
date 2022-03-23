package com.finupgroup.postloan.evaluate.entity.mongo;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

/**
 * @ClassName RepayServerList
 * @Description 服务器列表
 * @Author finup
 * @Date 2019-09-24 22:20
 * @Version 1.0
 **/
@Document(collection = "repay_server_list")
@Data
public class RepayServerList {

    @Id
    private String id;

    @Field("create_time")
    private Date createTime;

    @Field("update_time")
    private Date updateTime;

    @Field("server_address")
    private String serverAddress;

    @Field("is_open")
    private Boolean isOpen;

}