package com.finupgroup.postloan.evaluate.service.asset;

import com.finupgroup.postloan.evaluate.entity.asset.CoreCustomer;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 客户表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-08-26
 */
public interface CoreCustomerService extends IService<CoreCustomer> {

    /**
     * 根据Id查询客户信息
     **/
    CoreCustomer getCoreCustomerById(Long id);
}
