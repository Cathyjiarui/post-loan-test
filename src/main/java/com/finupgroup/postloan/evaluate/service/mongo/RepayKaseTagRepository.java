package com.finupgroup.postloan.evaluate.service.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayKaseTag;

public interface RepayKaseTagRepository {

    /**
     * 插入案件标签
     **/
    void insterKaseTag(RepayKaseTag repayKaseTag);
}
