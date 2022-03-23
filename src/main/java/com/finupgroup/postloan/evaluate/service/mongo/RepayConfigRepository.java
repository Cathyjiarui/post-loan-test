package com.finupgroup.postloan.evaluate.service.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayConfig;

/**
 * @Author cuishaohua
 * @Date 2019/9/4
 */
public interface RepayConfigRepository {
    /**
     * 查询核心进件号
     **/
    RepayConfig findCoreReqIdByName();

    /**
     * 更新核心进件号
     **/
    void updateCoreReqIdByName(Long core_req_id);
}
