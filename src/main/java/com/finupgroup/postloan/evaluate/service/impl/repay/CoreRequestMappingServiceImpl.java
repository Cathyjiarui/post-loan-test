package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.finupgroup.postloan.evaluate.entity.repay.CoreRequestMapping;
import com.finupgroup.postloan.evaluate.mapper.repay.CoreRequestMappingMapper;
import com.finupgroup.postloan.evaluate.service.repay.CoreRequestMappingService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 核心进件号映射关系表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
@Service
public class CoreRequestMappingServiceImpl extends ServiceImpl<CoreRequestMappingMapper, CoreRequestMapping> implements CoreRequestMappingService {

    @Autowired
    private CoreRequestMappingMapper coreRequestMappingMapper;

    @Override
    public Long getIdByCoreRequestId(Long coreRequestId) {
        QueryWrapper<CoreRequestMapping> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .lambda()
                .eq(CoreRequestMapping::getExternalCoreRequestId, coreRequestId);
        CoreRequestMapping coreRequestMapping = coreRequestMappingMapper.selectOne(queryWrapper);
        return coreRequestMapping.getId();
    }
}