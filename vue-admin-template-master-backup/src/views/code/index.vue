<template>

  <el-container style="height: 900px; border: 1px solid #eee">
    <el-dialog
      title="新建数据库连接"
      :visible.sync="dialogVisible"
      width="30%" :before-close="handleClose">
      <el-form ref="connectionForm" :model="connectionForm" :rules="rules" label-width="180px">
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="保存名称" prop="connectionName">
              <el-input v-model="connectionForm.connectionName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="数据库类型" prop="databaseType">
              <el-select v-model="connectionForm.databaseType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="主机名/IP地址" prop="hostName">
              <el-input v-model="connectionForm.hostName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="11">
            <el-form-item label="端口号" prop="port">
              <el-input v-model="connectionForm.port" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="connectionForm.userName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="密码" prop="password">
              <el-input v-model="connectionForm.password" auto-complete="new-password" type="password"
                        size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="Schema/数据库" prop="database">
              <el-input v-model="connectionForm.database" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="编码" prop="encoding">
              <el-select v-model="connectionForm.encoding" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in optionsEncoding"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialogNewConnection('connectionForm')">取 消</el-button>
          <el-button type="primary" @click="saveNewConnection('connectionForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-aside width="500px">
      <el-button type="primary" icon="el-icon-menu" size="medium" @click="openDialogNewConnection">添加连接</el-button>
      <el-button type="primary" icon="el-icon-tickets" size="medium">配置</el-button>
      <el-row class="tac">
        <el-col :span="18">
          <!-- <h5>默认颜色</h5>-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleSelect" @contextmenu.prevent.native="$easycm($event,$root)">
           <!-- <right-menu :pop-items="popItems" :mouse="mousePosition" @ListItemClick="list_item_click">
            </right-menu>-->
            <!--<context-menu id="context-menu" ref="ctxMenu">
              <ul class="easy-ul">
                <li @click="">option 1</li>
                <li class="disabled">option 2</li>
                <li>option 3</li>
              </ul>

            </context-menu>-->
            <easy-cm :list="rightClickMenu"></easy-cm>


            <el-submenu v-for="connection in connections" :index="connection.key" :key="connection.key">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <!--<span @click="handleSelect(connection)">{{connection.key}}</span>-->
                <span>{{connection.key}}</span>
              </template>
              <el-menu-item v-for="table in connection.tables" :index="table" @click="handleClick(table)">
                <i class="el-icon-rank"></i>
                <span slot="title">{{table}}</span>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-form ref="form" :model="form" label-width="180px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Controller</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <el-row>
            <el-form-item label="Controller类包名">
              <el-col :span="12">
                <el-input v-model="form.controller.packageName"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Service</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <el-row>
            <el-form-item label="Service类包名">
              <el-col :span="12">
                <el-input v-model="form.service.packageName"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Mapper</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <el-row>
            <el-form-item label="表名">
              <el-col :span="6">
                <el-input v-model="form.tableName" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="主键（选填）">
              <el-col :span="6">
                <el-input v-model="form.entity.id"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Entity类包名">
              <el-col :span="12">
                <el-input v-model="form.entity.packageName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Mapper类包名">
              <el-col :span="12">
                <el-input v-model="form.mapper.packageName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Mapper类名（自定义）">
              <el-col :span="12">
                <el-input v-model="form.mapper.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="12">
                <el-switch
                  v-model="form.isPaging"
                  active-text="分页">
                </el-switch>
                <el-switch
                  v-model="form.isPaging"
                  active-text="生成注释">
                </el-switch>
              </el-col>
            </el-form-item>
          </el-row>
        </el-card>

        <el-button type="success">代码生成</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>


      </el-form>
    </el-container>
  </el-container>
</template>
<script>
  import {setLocalStorage, getLocalStorage} from '@/utils/storage.js';
  import {doPost} from "../../utils/http";
  //import contextMenu from 'vue-context-menu'

  export default {
    //components: { contextMenu },
    data() {
      return {
        rightClickMenu:[{
          text: 'Play Now',
          icon: 'iconfont icon-bofang',  //选填 字体图标 class
          children: [] //选填
        }],
        connections: [],
        //tables: [],
        optionsEncoding: [
          {
            value: '1',
            label: 'utf-8'
          },
          {
            value: '2',
            label: 'gb2312'
          },
          {
            value: '3',
            label: 'gbk'
          }
        ],
        options: [{
          value: '1',
          label: 'MySQL'
        }, {
          value: '2',
          label: 'MySQL_v8'
        }, {
          value: '3',
          label: 'Oracle'
        }, {
          value: '4',
          label: 'IBM DB2'
        }, {
          value: '5',
          label: 'PostgreSQL'
        }, {
          value: '6',
          label: 'SQL_Server'
        }, {
          value: '7',
          label: 'Sqllite'
        }],
        value: '',
        connectionForm: {
          index: -1,
          connectionName: '',
          databaseType: '',
          hostName: '',
          port: '',
          userName: '',
          password: '',
          database: '',
          encoding: ''
        },
        form: {
          isPaging: true,
          tableName: 't_device',
          encoding: '',
          controller: {
            name: 'DeviceController',
            packageName: 'com.minivision.sms.agw.gateway.controller.device',
            path: 'src/main/java',
            isGenerate: true
          },
          service: {
            name: 'DeviceService',
            packageName: 'com.minivision.sms.agw.gateway.service.device',
            path: 'src/main/java',
            isGenerate: true
          },
          dto: {
            name: 'Device',
            packageName: 'com.minivision.sms.api.domain.dto.device',
            path: 'src/main/java',
            isGenerate: true
          },
          entity: {
            id: 'device_id',
            name: 'Device',
            packageName: 'com.minivision.sms.main.domain.entity.device',
            path: 'src/main/java',
            isGenerate: true
          },
          mapper: {
            name: 'DeviceMapper',
            packageName: 'com.minivision.sms.main.domain.mapper.device',
            path: 'src/main/java',
            isGenerate: true
          },
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogVisible: false,
        rules: {
          connectionName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          databaseType: [
            {required: true, message: '请选择数据类型', trigger: 'blur'}
          ],
          hostName: [
            {required: true, message: '请输入主机名/IP地址', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入端口', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          database: [
            {required: true, message: '请输入Schema/数据库', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.connectionForm =
        {
          index: -1,
          connectionName: '',
          databaseType: '',
          hostName: '',
          port: '',
          userName: '',
          password: '',
          database: '',
          encoding: 'UTF-8'
        };

      this.loadConnection();
    },
    methods: {
      popMenu(e){
        //alert(1);
        let self = this;
        e.preventDefault();
        //alert(e.button === 2)
        if(e.button ===2){
          let x = e.layerX;
          let y = e.layerY;
          self.mousePosition = [x, y];
        }
        else if(e.button ===0){
          self.mousePosition = ['close'];
        }
      },
      list_item_click(it){
        switch (it){
          case 0:
            alert('第一项被点击');
            break;
          case 1:
            alert('第二项被点击');
            break;
        }
      },
      rightShow() {
        alert('right-click')
      },
      loadDatabase(connection) {
        alert(connection);
      },
      openDialogNewConnection() {
        this.connectionForm =
          {
            index: -1,
            connectionName: '',
            databaseType: '',
            hostName: '',
            port: '',
            userName: '',
            password: '',
            database: '',
            encoding: 'UTF-8'
          };
        this.dialogVisible = true;
      },
      closeDialogNewConnection(form) {
        this.dialogVisible = false;
        this.$refs[form].resetFields();
        this.loadConnection();
      },
      handleKey(key) {
        if (getLocalStorage(key) == null) {
          if (getLocalStorage('connectionsIndex') == null) {
            setLocalStorage('connectionsIndex', JSON.stringify([{'key': key, 'index': 0}]))
          } else {
            let indexInJson = JSON.parse(getLocalStorage('connectionsIndex'));
            /* console.log("a" + indexInJson);
             for (var connection in indexInJson) {
               temp.push({'key': connection.key});
             }*/
            let idx = indexInJson.length;
            indexInJson.push({'key': key, 'index': idx, 'tables':[]});
            setLocalStorage('connectionsIndex', JSON.stringify(indexInJson));
            return idx;
          }
        }
      },
      saveNewConnection(form) {
        //let key = this.connectionForm.hostName + ":" + this.connectionForm.port + "@" + this.connectionForm.database;

        this.$refs[form].validate((valid) => {
          if (valid) {
            let key = this.connectionForm.connectionName;
            let idx = this.handleKey(key);
            if (getLocalStorage(key) == null) {
              this.connectionForm.index = idx;
              setLocalStorage(key, JSON.stringify(this.connectionForm));
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.loadConnection();
            } else {
              this.$message({
                message: '该名称已经存在',
                type: 'warning'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleOpen(key, keyPath) {
        //doPost
      },
      handleSelect(connection, keyPath) {
        let that = this;
        //alert(1);
        //console.log(this.connections);
        doPost(getLocalStorage(connection),"/database/connect")
          .then(res => {
            //this.tables = res.data.data;
            //alert(that.connections.length);
            console.log(that.connections)
            for (let i = 0;i< that.connections.length; i++) {
               if (that.connections[i].key === connection) {
                 that.connections[i].tables = res.data.data;
               }
            }
            //console.log(that.connections);

          });

      },
      handleClick(tableName) {
       let json = {"tableName":tableName}
        //alert('click')
        let that = this;
        doPost(json, "/code/getPackageAndClass")
          .then(res => {
            let response = res.data.data;
            that.form.controller = response.controller;
            that.form.mapper = response.mapper;
            that.form.service = response.service;
            that.form.dto = response.dto;
            that.form.entity = response.entity;
            that.form.tableName = response.tableName;
            //alert(res.data.data);
          });
      },
      /* handleClose(key, keyPath) {
         console.log(key, keyPath);
       },*/
      onSubmit() {
        console.log('submit!');
      },
      handleClose(done) {
        /* this.$confirm('确认关闭？')
           .then(_ => {
             done();
           })
           .catch(_ => {
           });*/
        this.loadConnection();
        done();
      },
      loadConnection() {
        let indexInJson = JSON.parse(getLocalStorage('connectionsIndex'));
        this.connections = indexInJson;

      }
    }
  }
</script>
<style>
  .easy-ul li {
    background-color: #df5000;
    color: #ffffff;
  }

  .easy-ul li div:hover{
    background-color: #ffffff !important;
    color: #df5000 !important;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1024px;
  }

  .el-form-item {
    margin-bottom: 11px;
  }
</style>
