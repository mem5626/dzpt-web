<template>
  <div>
    <Search></Search>
    <div class="container">
      <el-card shadow="hover">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#FA8072"
            text-color="#fff"
            active-text-color="#FFFAFA">
            <el-menu-item index="1" style="font-size:22px"><i class="el-icon-s-flag" style="heignt:30px"></i>我的挂牌</el-menu-item>
          </el-menu>
        </div>
        <el-dialog title="编辑挂牌信息" :visible.sync="dialogFormVisible"
                   :center="true">
            <el-form :model="dialogform" :inline="true" :rules="rules">
              <p>挂牌单号：{{this.dialogform.listedGoodsId}}</p>
              <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth" style="width: 48%;">
                <el-input v-model="dialogform.goodsName" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="种类" prop="type" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.type" placeholder="选择种类" >
                  <el-option label="钢铁" value="钢铁"></el-option>
                  <el-option label="煤炭" value="煤炭"></el-option>
                  <el-option label="铁矿石" value="铁矿石"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数量" prop="amount" :label-width="formLabelWidth" style="width: 48%;">
                <el-input v-model.number="dialogform.amount" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="unit" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.unit" placeholder="选择单位" >
                  <el-option label="Kg,千克" value="Kg"></el-option>
                  <el-option label="T,吨" value="T"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单价" prop="price" :label-width="formLabelWidth" style="width: 55%">
                <el-input v-model.number="dialogform.price" style="width: 77%">
                  <template slot="append">元 / {{dialogform.unit}}</template>
                </el-input>
              </el-form-item>
              <el-form-item label="总价 " :label-eidth="formLabelWidth"
                            style="width: 37%">
                {{getdia_totalprice}} 元</el-form-item>

              <el-form-item label="商品来源" prop="region" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.region" placeholder="选择商品来源">
                  <el-option label="进口货" value="进口货"></el-option>
                  <el-option label="非进口货" value="非进口货"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="质量标准" prop="quality" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.quality" placeholder="选择商品质量标准">
                  <el-option label="良好" value="良好"></el-option>
                  <el-option label="合格" value="合格"></el-option>
                  <el-option label="不合格" value="不合格"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form-item label="我的地址" prop="address" :label-width="formLabelWidth" style="width: 95%">
              <el-input v-model="dialogform.address"></el-input>
            </el-form-item>
            <el-form-item label="撮合交易" :label-width="formLabelWidth" >
              <el-radio-group  v-model="dialogform.ismatch">
                <el-radio label="yes">允许</el-radio>
                <el-radio label="no" >不允许</el-radio>
              </el-radio-group>
            </el-form-item>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit(dialogform)">确 定</el-button>
          </div>
        </el-dialog>
        <div>
          <h2>售出挂牌</h2>
          <el-table
            :data="tableData1"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="createDate"
              label="挂牌日期"
               width="180px"
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="挂牌数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click="modify(scope.row,scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click="deleteRow(scope.row, scope.$index, tableData1)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <hr style="border: 2px solid; margin: 40px 0"/>
          <h2>需求挂牌</h2>
          <el-table
            :data="tableData2"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="createDate"
              label="挂牌日期"
              width="180px"
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="需求数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="接受价格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="120">
              <template slot-scope="scope">
               <el-button
                  @click="modify(scope.row,scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click="deleteRow(scope.row, scope.$index, tableData2)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
      <div class="container">
        <el-card shadow="hover">
          <div class="freeback-box-border">
            <div class="freeback-box">
              <div class="freeback-title">
                <h1>挂牌信息</h1>
                <h2>请您填写以下挂牌信息进行商品挂牌</h2>
              </div>
              <div class="freeback-content">
                <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm">
                  <el-form-item label="挂牌类型" prop="hangType"  :label-width="formLabelWidth" style="width: 100%;text-align:left;margin-left:12px">
                    <el-radio-group v-model="ruleForm.hangType">
                      <el-radio label="售出">售出挂牌</el-radio>
                      <el-radio label="需求">需求挂牌</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <!-- <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm"> -->
                    <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth" style="width: 48%">
                      <el-input v-model="ruleForm.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="种类" prop="type"  :label-width="formLabelWidth" style="eidth: 48%">
                      <el-select v-model="ruleForm.type" placeholder="选择商品种类" >
                        <el-option label="钢铁" value="钢铁"></el-option>
                        <el-option label="煤炭" value="煤炭"></el-option>
                        <el-option label="高线" value="高线"></el-option>
                        <el-option label="螺纹钢" value="螺纹钢"></el-option>
                        <el-option label="铁矿石" value="铁矿石"></el-option>
                        <el-option label="水泥" value="水泥"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="挂牌数量" prop="amount" :label-width="formLabelWidth" style="width: 48%;">
                      <el-input v-model.number="ruleForm.amount" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit"  :label-width="formLabelWidth" style="eidth: 48%">
                      <el-select v-model="ruleForm.unit" placeholder="选择单位" >
                        <el-option label="Kg，千克" value="Kg"></el-option>
                        <el-option label="T，吨" value="T"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="商品单价" prop="price" :label-width="formLabelWidth" style="width:59%">
                      <el-input v-model.number="ruleForm.price">
                        <template slot="append">元 / {{ruleForm.unit}}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="总价 " :label-eidth="formLabelWidth"
                                  style="width: 37%">
                      {{get_totalprice}} 元
                    </el-form-item>

                    <el-form-item label="商品来源" prop="region"  :label-width="formLabelWidth" style="eidth: 46%">
                      <el-select v-model="ruleForm.region" placeholder="选择商品来源">
                        <el-option label="进口货" value="进口货"></el-option>
                        <el-option label="非进口货" value="非进口货"></el-option>
                      </el-select>
                      </el-form-item>
                    <el-form-item label="质量标准" prop="quality"  :label-width="formLabelWidth" style="eidth: 46%">
                      <el-select v-model="ruleForm.quality" placeholder="选择商品质量标准">
                        <el-option label="优" value="优"></el-option>
                        <el-option label="良好" value="良好"></el-option>
                        <el-option label="合格" value="合格"></el-option>
                      </el-select>
                    </el-form-item>

                  <el-form-item label="撮合交易" prop="ismatch" required="" :label-width="formLabelWidth" style="width: 100%;text-align:left;margin-left:12px">
                    <el-radio-group v-model="ruleForm.ismatch">
                      <el-radio label="true">允许</el-radio>
                      <el-radio label="false" >不允许</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item v-if="this.ruleForm.hangType==='售出'" label="" prop="msg" style="width: 100%;text-align:left;margin-left:20px">
                    <el-upload
                    action
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    ref="upload"
                    :auto-upload="false"
                    :on-change="fileChange">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                   <img width="100%" :src="dialogImageUrl" alt>
                  </el-dialog>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submitForm('ruleForm')">立即挂牌</el-button>
                  <el-button @click="resetForm('ruleForm')">重  置</el-button>
                </div>

              </div>
            </div>
          </div>

        </el-card>

      </div>

  </div>

</template>

<script>
import Search from '@/components/search/Search3'
import store from '@/vuex/store'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Search
  },
  computed: {
    ...mapState(['userInfo']),
    getunit: function () {
      return this.ruleForm.unit
    },
    getdia_totalprice: function () {
      return this.dialogform.price * this.dialogform.amount
    },
    get_totalprice: function () {
      return this.ruleForm.price * this.ruleForm.amount
    }
  },
  data () {
    return {
      files: null,
      dataimg: [{
        src: require('../assets/img/3.jpg')
      },
      {
        src: require('../assets/img/1.jpg')

      },
      {
        src: require('../assets/img/6.jpg')
      }
      ],
      formInline: {
        user: '',
        region: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      tableData: [],
      tableData1: [],
      tableData2: [],
      ruleForm: {
        goodsName: '',
        type: '',
        hangType: '',
        amount: '',
        price: '',
        region: '',
        quality: '',
        ismatch: '',
        unit: ''
      },
      dialogform: {
        listedGoodsId: '',
        goodsName: '',
        type: '',
        hangType: '',
        amount: '',
        price: '',
        region: '',
        quality: '',
        ismatch: '',
        unit: ''
      },
      rules: {
        goodsName: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],

        unit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品单价', trigger: 'blur' },
          { type: 'number', message: '请输入正确的数字', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入挂单数量/质量', trigger: 'blur' },
          { type: 'number', message: '请输入正确的数字', trigger: 'blur' }
        ],
        // address: [
        //   { required: true, message: '请输入地址', trigger: 'blur'},
        //   { min: 8, message: '地址最小长度为8个字符', trigger: 'blur'},
        // ],
        region: [
          { required: true, message: '请选择商品来源', trigger: 'change' }
        ],
        quality: [
          { required: true, message: '请选择质量等级', trigger: 'change' }
        ],
        hangType: [
          { required: true, message: '请选择挂牌类型', trigger: 'change' }
        ],
        ismatch: [
          { required: true, message: '是否同意撮合交易', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择商品种类', trigger: 'change' }
        ]
      },

      dialogFormVisible: false,
      formLabelWidth: '100px',
      params: {
        userId: ''
      },
      hangData: {
        goodsName: '',
        type: '',
        hangType: '',
        amount: '',
        price: '',
        region: '',
        quality: '',
        ismatch: '',
        supplier: '',
        address: '',
        unit: ''
      },
      hangData2: {
        id: '',
        goodsName: '',
        type: '',
        amount: '',
        price: '',
        region: '',
        quality: '',
        unit: ''
      },
      delData: {
        listedGoodsId: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      index: ''
    }
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    this.getRequest('/hang/getMyHangList', this.params)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.data.hangList)
        const hangList = response.data.data.hangList
        for (const i in hangList) {
          hangList[i].createDate = this.dateFormat(hangList[i].createDate)
          if (hangList[i].hangType === '售出') {
            this.tableData1.push(hangList[i])
          } else {
            this.tableData2.push(hangList[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  methods: {
    ...mapActions(['isLogin']),
    ...mapState(['userInfo']),
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    fileChange (file) {
      const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg']
      const isJPG = typeArr.indexOf(file.raw.type) !== -1
      // image/png, image/jpeg, image/gif, image/jpg
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('只能是图片!')
        this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      this.files = file.raw
      console.log(file)
    },
    submitForm (formName) {
      this.hangData.hangType = this.ruleForm.hangType
      this.hangData.type = this.ruleForm.type
      this.hangData.amount = this.ruleForm.amount
      this.hangData.price = this.ruleForm.price
      this.hangData.unit = this.ruleForm.unit
      this.hangData.goodsName = this.ruleForm.goodsName
      this.hangData.region = this.ruleForm.region
      this.hangData.quality = this.ruleForm.quality
      if (this.ruleForm.ismatch === 'true') {
        this.hangData.ismatch = true
      } else {
        this.hangData.ismatch = false
      }
      this.hangData.supplier = this.userInfo.userId
      console.log(this.ruleForm)
      console.log(this.hangData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          Object.keys(this.hangData).forEach((ele) => {
            formData.append(ele, this.hangData[ele])
          })
          formData.append('imageFile', this.files)
          console.log(formData.get('goodsName'))
          this.postFormRequest('/hang/hangNow', formData).then((res) => {
            console.log(res.data)
            this.res1 = res.data
            if (this.res1.code === '1') {
              this.$alert('商品挂牌成功！', '执行结果', {
                confirmButtonText: '确定',
                callback: action => {
                  this.getList()
                }
              })
              this.$refs[formName].resetFields()
            } else {
              this.$alert('商品挂牌失败！', '执行结果', {
                confirmButtonText: '确定'
              })
              return false
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getList () {
      this.tableData1 = []
      this.tableData2 = []
      this.getRequest('/hang/getMyHangList', this.params)
        .then((response) => {
          console.log(response.data)
          console.log(response.data.data.hangList)
          const hangList = response.data.data.hangList
          for (const i in hangList) {
            hangList[i].createDate = this.dateFormat(hangList[i].createDate)
            if (hangList[i].hangType === '售出') {
              this.tableData1.push(hangList[i])
            } else {
              this.tableData2.push(hangList[i])
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    modify (row, index) {
      console.log(row)
      this.dialogFormVisible = true

      this.dialogform.listedGoodsId = row.listedGoodsId
      this.dialogform.goodsName = row.goodsName
      this.dialogform.amount = row.amount
      this.dialogform.unit = row.unit
      this.dialogform.price = row.price
      this.dialogform.region = row.region
      this.dialogform.quality = row.quality
      this.dialogform.address = row.address
      this.dialogform.ismatch = row.ismatch
      this.dialogform.type = row.type

      this.index = index
    },
    commit (formName) {
      this.hangData2.id = this.dialogform.listedGoodsId
      this.hangData2.type = this.dialogform.type
      this.hangData2.amount = this.dialogform.amount
      this.hangData2.price = this.dialogform.price
      this.hangData2.unit = this.dialogform.unit
      this.hangData2.goodsName = this.dialogform.goodsName
      this.hangData2.region = this.dialogform.region
      this.hangData2.quality = this.dialogform.quality
      console.log(this.dialogform)
      console.log(this.hangData2)
      this.postRequest('/hang/changeHangInfo', this.hangData2).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('挂牌信息编辑成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false
              this.getList()
            }
          })
        } else {
          this.$alert('挂牌信息编辑失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    deleteRow (row, index, tableData) {
      console.log(row)
      this.delData.listedGoodsId = row.listedGoodsId
      console.log(this.delData)
      this.postRequest('/hang/deleteHangGood', this.delData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          tableData.splice(index, 1)
          this.$alert('删除挂牌商品成功！', '执行结果', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert('删除挂牌商品失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    }
  },
  store

}
</script>

<style scoped>
.hangout {
  width:400px;
  position: center;
}
.nav-body {
  width: 100%;
  height: 380px;
  margin: 0px auto;
  background-color:#6e6568
}
.play {
    margin-right: 130px;
    margin-left:0px;
}
.button1 {
    width:20px;
    margin-top:20px;
}
/*导航内容*/
.nav-content {
  width: 100%;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
.container {
  margin: 30px auto 0 auto;
  padding-bottom: 20px;
  max-width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}
.freeback-container {
  margin: 0px auto;
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  /* background-color: #ccc; */
}
.freeback-img-box {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-img-box img {
  width: 50%;
}
.freeback-box-border {
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-box {
  width: 670px;
}
/* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>
