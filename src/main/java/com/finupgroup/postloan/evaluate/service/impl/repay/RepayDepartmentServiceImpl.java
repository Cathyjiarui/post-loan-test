package com.finupgroup.postloan.evaluate.service.impl.repay;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.finupgroup.postloan.evaluate.entity.repay.RepayDepartment;
import com.finupgroup.postloan.evaluate.mapper.repay.RepayDepartmentMapper;
import com.finupgroup.postloan.evaluate.service.repay.RepayDepartmentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 部门管理表 服务实现类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
@Slf4j
@Service
public class RepayDepartmentServiceImpl extends ServiceImpl<RepayDepartmentMapper, RepayDepartment> implements RepayDepartmentService {

    @Autowired
    private RepayDepartmentMapper repayDepartmentMapper;

    @Override
    public Long getUcOrgId(String name) {

        QueryWrapper<RepayDepartment> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .lambda()
                .eq(RepayDepartment::getName, name);
        RepayDepartment repayDepartment = repayDepartmentMapper.selectOne(queryWrapper);
        if (repayDepartment == null) {
            return null;
        } else {
            return repayDepartment.getUcOrgId();
        }
    }
}