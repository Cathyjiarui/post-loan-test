package com.finupgroup.postloan.evaluate.service.mongo;

import com.finupgroup.postloan.evaluate.entity.mongo.RepayServerList;

import java.util.List;

public interface RepayServerListRepository {

    /**
     * 添加服务器信息
     **/
    void insterServerList(RepayServerList repayServerList);

    /**
     * 查询数据总量
     **/
    Long getCount();

    /**
     * 查询服务器信息
     **/
    List<RepayServerList> getServerList(int limit, int skip);

    /**
     * 根据id更新服务器状态
     **/
    void updateIsOpenById(String id, boolean isOpen);

    /**
     * 根据id更新服务器地址
     **/
    void updateServerAddressById(String id, String serverAddress);
}
