package com.finupgroup.postloan.evaluate.service.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayPushCase;

import java.util.List;

public interface RepayPushCaseRepository {

    /**
     * 根据id查询案件
     **/
    RepayPushCase findPushCaseById(String id);


    /**
     * 根据业务线查询案件
     **/
    List<RepayPushCase> findAllByServiceUserId(Integer serviceUserId);

    /**
     * 插入案件
     **/
    void insterPushCase(RepayPushCase repayPushCase);

    /**
     * 更新推案状态
     **/
    void updatePushStatusById(String id);

    /**
     * 更新推案状态
     **/
    Long selectCoreReqId();
}
