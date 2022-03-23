package com.finupgroup.postloan.evaluate.service.repay;

import com.finupgroup.postloan.evaluate.entity.repay.RepayDepartment;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 * 部门管理表 服务类
 * </p>
 *
 * @author zhangjia
 * @since 2019-04-01
 */
public interface RepayDepartmentService extends IService<RepayDepartment> {


    /**
     * @return
     * @Description 获取部门ID
     * @Param
     **/
    Long getUcOrgId(String name);
}
