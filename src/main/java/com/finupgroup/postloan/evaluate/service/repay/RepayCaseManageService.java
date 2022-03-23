package com.finupgroup.postloan.evaluate.service.repay;

import com.finupgroup.postloan.evaluate.entity.repay.RepayCaseManage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 案件表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-09-17
 */
public interface RepayCaseManageService extends IService<RepayCaseManage> {

    /**
     * 查询开启的个贷与钱站案件
     **/
    List<RepayCaseManage> getOpenLQCase();

    /**
     * 根据Id清空客群组ID
     **/
    Integer nullCustomerGroupIdById(Long id);
}
