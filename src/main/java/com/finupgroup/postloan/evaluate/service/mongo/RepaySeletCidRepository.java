package com.finupgroup.postloan.evaluate.service.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepaySeletCid;

import java.util.List;

/**
 * @Author cuishaohua
 * @Date 2019/9/11
 */
public interface RepaySeletCidRepository {
    /**
     * 查询核心进件号
     **/
    List <Long> findCoreReqIdByStatus();

    /**
     * 清空核心案件id表
     **/
    boolean emptySelectCoreId();

    /**
     * 插入核心案件id表
     **/
    void insertCoreId(RepaySeletCid repaySeletCid);
}
