package com.finupgroup.postloan.evaluate.service.repay;

import com.finupgroup.postloan.evaluate.entity.repay.CoreRequestMapping;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 核心进件号映射关系表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
public interface CoreRequestMappingService extends IService<CoreRequestMapping> {


    /**
     * @return
     * @Description 查询repay_case_manager中的core_request_id
     * @Param
     **/
    Long getIdByCoreRequestId(Long coreRequestId);
}
