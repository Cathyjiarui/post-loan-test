package com.finupgroup.postloan.evaluate.service.impl.asset;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.finupgroup.postloan.evaluate.entity.asset.CoreCustomer;
import com.finupgroup.postloan.evaluate.mapper.asset.CoreCustomerMapper;
import com.finupgroup.postloan.evaluate.service.asset.CoreCustomerService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 客户表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-08-26
 */
@DS("slave")
@Service
public class CoreCustomerServiceImpl extends ServiceImpl<CoreCustomerMapper, CoreCustomer> implements CoreCustomerService {

    @Autowired
    private CoreCustomerMapper coreCustomerMapper;

    @Override
    public CoreCustomer getCoreCustomerById(Long id) {

        return coreCustomerMapper.selectById(id);
    }
}