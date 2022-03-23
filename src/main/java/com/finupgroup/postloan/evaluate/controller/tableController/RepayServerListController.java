package com.finupgroup.postloan.evaluate.controller.tableController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.finupgroup.postloan.evaluate.entity.mongo.RepayServerList;
import com.finupgroup.postloan.evaluate.service.mongo.RepayServerListRepository;
import com.finupgroup.postloan.evaluate.utils.HttpUtils;
import com.finupgroup.postloan.evaluate.utils.ParseJsonToMapUtil;
import com.finupgroup.postloan.evaluate.vo.InterFaceVo;
import com.finupgroup.postloan.evaluate.vo.TableDataVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务器表 前端控制器
 * </p>
 *
 * @author zhangjia
 * @since 2019-09-29
 */
@Slf4j
@RestController
@RequestMapping("/ServiceList")
public class RepayServerListController {

    @Autowired
    private RepayServerListRepository repayServerListRepository;

    @Autowired
    private HttpUtils httpUtils;

    @Autowired
    private ParseJsonToMapUtil parseJsonToMapUtil;

    @GetMapping("getServiceList")
    public TableDataVo getServiceList(@RequestParam(value = "page") int page, @RequestParam(value = "limit") int limit) {
        //初始化返回值
        TableDataVo tableDataVo = new TableDataVo();
        tableDataVo.setCode(0);
        tableDataVo.setMsg("");
        tableDataVo.setCount(repayServerListRepository.getCount());
        int skip = (page - 1) * limit;
        List<RepayServerList> repayServerLists = repayServerListRepository.getServerList(limit, skip);
        List<JSONObject> data = new ArrayList<>();
        for (RepayServerList repayServerList : repayServerLists) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", repayServerList.getId());
            jsonObject.put("serverAddress", repayServerList.getServerAddress());
            jsonObject.put("isSwitch", repayServerList.getIsOpen() ? "开启" : "关闭");
            data.add(jsonObject);
        }
        tableDataVo.setData(data);
        return tableDataVo;
    }

    @GetMapping("updateIsOpenById")
    public Integer updateIsOpenById(@RequestParam(value = "id") String id, @RequestParam(value = "isOpen") int isOpen) {
        boolean status = false;
        if (isOpen == 1) {
            status = true;
        }
        try {
            repayServerListRepository.updateIsOpenById(id, status);
            return 1;
        } catch (Exception e) {
            log.error(e.toString());
            return 0;
        }
    }

    @GetMapping("updateServerAddressById")
    public Integer updateServerAddressById(@RequestParam(value = "id") String id, @RequestParam(value = "serverAddress") String serverAddress) {
        try {
            repayServerListRepository.updateServerAddressById(id,serverAddress);
            return 1;
        }catch (Exception e){
            log.error(e.toString());
            return 0;
        }
    }

    @GetMapping("insterServerList")
    public Integer insterServerList(@RequestParam(value = "serverAddress") String serverAddress){
        RepayServerList repayServerList = new RepayServerList();
        repayServerList.setCreateTime(new Date());
        repayServerList.setUpdateTime(new Date());
        repayServerList.setServerAddress(serverAddress);
        repayServerList.setIsOpen(true);
        try{
            repayServerListRepository.insterServerList(repayServerList);
            return 1;
        }catch (Exception e){
            log.error(e.toString());
            return 0;
        }
    }

    @GetMapping("serverInterFaceList")
    public TableDataVo serverInterFaceList(@RequestParam(value = "url") String url){
        log.info("查询的URL地址为：{}",url);
        TableDataVo tableDataVo = new TableDataVo();
        tableDataVo.setCode(0);
        tableDataVo.setMsg("");
        List<InterFaceVo> data = parseJsonToMapUtil.resultToList(httpUtils.Get(url + "/v2/api-docs"));
        tableDataVo.setData(data);
        tableDataVo.setCount(Long.valueOf(data.size()));
        return tableDataVo;
    }
}