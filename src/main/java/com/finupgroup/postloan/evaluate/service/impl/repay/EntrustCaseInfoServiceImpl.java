package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.finupgroup.postloan.evaluate.entity.repay.EntrustCaseInfo;
import com.finupgroup.postloan.evaluate.mapper.repay.EntrustCaseInfoMapper;
import com.finupgroup.postloan.evaluate.service.repay.EntrustCaseInfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 委托案件信息表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
@Service
public class EntrustCaseInfoServiceImpl extends ServiceImpl<EntrustCaseInfoMapper, EntrustCaseInfo> implements EntrustCaseInfoService {

    @Autowired
    private EntrustCaseInfoMapper entrustCaseInfoMapper;

    @Override
    public EntrustCaseInfo getByCoreRequestId(Long coreRequestId) {
        QueryWrapper<EntrustCaseInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .last("limit 1")
                .lambda()
                .eq(EntrustCaseInfo::getCoreRequestId, coreRequestId)
                .orderByDesc(EntrustCaseInfo::getId);
        return entrustCaseInfoMapper.selectOne(queryWrapper);
    }
}