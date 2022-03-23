package com.finupgroup.postloan.evaluate.service.repay;

import com.finupgroup.postloan.evaluate.entity.repay.EntrustCaseInfo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 委托案件信息表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
public interface EntrustCaseInfoService extends IService<EntrustCaseInfo> {


    /**
     * @return
     * @Description 根据核心进件号查询信息
     * @Param
     **/
    EntrustCaseInfo getByCoreRequestId(Long coreRequestId);

}
