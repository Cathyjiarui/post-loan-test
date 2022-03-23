package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.finupgroup.postloan.evaluate.entity.repay.RepayCaseManage;
import com.finupgroup.postloan.evaluate.mapper.repay.RepayCaseManageMapper;
import com.finupgroup.postloan.evaluate.service.repay.RepayCaseManageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 案件表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-09-17
 */
@DS(value = "slave2")
@Service
public class RepayCaseManageServiceImpl extends ServiceImpl<RepayCaseManageMapper, RepayCaseManage> implements RepayCaseManageService {

    @Autowired
    private RepayCaseManageMapper repayCaseManageMapper;

    @Override
    public List<RepayCaseManage> getOpenLQCase() {
        List<Long> serviceUserIds = new ArrayList<>();
        serviceUserIds.add(2L);
        serviceUserIds.add(3L);
        serviceUserIds.add(4L);
        QueryWrapper<RepayCaseManage> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .last("limit 80000")
                .lambda()
                .eq(RepayCaseManage::getStatus,1)
                .in(RepayCaseManage::getServiceUserId, serviceUserIds);
        return repayCaseManageMapper.selectList(queryWrapper);
    }

    @Override
    public Integer nullCustomerGroupIdById(Long id) {
        LambdaUpdateWrapper<RepayCaseManage> lambdaUpdateWrapper = new UpdateWrapper<RepayCaseManage>().lambda();
        lambdaUpdateWrapper
                .eq(RepayCaseManage::getId,id)
                .set(RepayCaseManage::getCustomerGroupId,null);
        return repayCaseManageMapper.update(new RepayCaseManage(),lambdaUpdateWrapper);
    }
}