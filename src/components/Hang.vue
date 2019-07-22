<template>
  <div class="container">
    <Search></Search>
    <div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#FA8072"
          text-color="#fff"
          active-text-color="#FFFAFA">
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-s-flag" style="heignt:30px"></i>我的挂牌</el-menu-item>
        </el-menu>
    </div>
    <el-dialog title="编辑挂牌信息 挂牌号：T001" :visible.sync="dialogFormVisible"
               :center="true">
          <el-form :model="dialogform" :rules="rules">
            <el-form :model="dialogform" :inline="true" :rules="rules">
            <el-form-item label="商品名称" prop="product_name" :label-width="formLabelWidth" style="width: 48%">
              <el-input v-model="dialogform.product_name"></el-input>
            </el-form-item>
            <el-form-item label="种类" prop="product_type" :label-width="formLabelWidth" style="eidth: 48%">
              <el-select v-model="dialogform.product_type" placeholder="选择商品种类" >
                <el-option label="钢铁" value="steel"></el-option>
                <el-option label="煤炭" value="coal"></el-option>
                <el-option label="铁矿石" value="mineral"></el-option>
              </el-select>
            </el-form-item>

              <el-form-item label="数量" prop="number" :label-width="formLabelWidth" style="width: 48%;">
                <el-input v-model="dialogform.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="unit" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.unit" placeholder="选择单位" >
                  <el-option label="Kg, 千克" value="Kg"></el-option>
                  <el-option label="T, 吨" value="T"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单价" prop="price" :label-width="formLabelWidth" style="width: 55%">
                <el-input v-model="dialogform.price" style="width: 77%">
                  <template slot="append">元 / {{dialogform.unit}}</template>
                </el-input>
              </el-form-item>
              <el-form-item label="总价 " :label-eidth="formLabelWidth"
                style="width: 37%">
                {{gettotalprice}} 元</el-form-item>

              <el-form-item label="商品来源" prop="region" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.region" placeholder="选择商品来源">
                  <el-option label="进口货" value="import"></el-option>
                  <el-option label="非进口货" value="notimport"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="质量标准" prop="qs" :label-width="formLabelWidth" style="width: 48%">
                <el-select v-model="dialogform.qs" placeholder="选择商品质量标准">
                  <el-option label="良好" value="good"></el-option>
                  <el-option label="合格" value="average"></el-option>
                  <el-option label="不合格" value="bad"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form-item label="我的地址" prop="addr" :label-width="formLabelWidth" style="width: 95%">
              <el-input v-model="dialogform.addr"></el-input>
            </el-form-item>
            <el-form-item label="撮合交易" :label-width="formLabelWidth" >
              <el-radio-group  v-model="dialogform.match">
                <el-radio label="yes">允许</el-radio>
                <el-radio label="no" >不允许</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit()">确 定</el-button>
      </div>
       </el-dialog>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="date"
              label="挂牌日期"
              width="150">
            </el-table-column>
            <el-table-column
              fixed
              prop="type"
              label="挂牌类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="hang_number"
              label="挂单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="商品名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="number"
              label="挂单数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="price"
              label="整单价格"
              width="150">
            </el-table-column>
            <el-table-column
              prop="standard"
              label="质量标准"
              width="150">
            </el-table-column>
            <el-table-column
              prop="other"
              label="交易方"
              width="200">
            </el-table-column>
            <el-table-column
              prop="addr"
              label="交易方地址"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                  <el-button
                  @click.native.prevent="modify()"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>

    <div class="freeback-container">
      <div class="freeback-img-box">
        <img src="static/img/logo.png">
      </div>
      <div class="freeback-box-border">
        <div class="freeback-box">
          <div class="freeback-title">
            <h1>挂牌信息</h1>
            <h2>请您填写以下挂牌信息进行商品挂牌</h2>
          </div>
          <div class="freeback-content">
            <el-form v-model="ruleForm" :rules="rules">
              <el-form-item label="挂牌类型" label-width="formLabelWidth" style="width: 45%">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="sell">售出挂牌</el-radio>
                  <el-radio label="need" >需求挂牌</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form :model="ruleForm" :inline="true" :rules="rules">
                <el-form-item label="商品名称" prop="product_name" :label-width="formLabelWidth" style="width: 48%">
                  <el-input v-model="ruleForm.product_name"></el-input>
                </el-form-item>
                <el-form-item label="种类" prop="product_type" :label-width="formLabelWidth" style="eidth: 48%">
                  <el-select v-model="ruleForm.product_type" placeholder="选择商品种类" >
                    <el-option label="钢铁" value="steel"></el-option>
                    <el-option label="煤炭" value="coal"></el-option>
                    <el-option label="铁矿石" value="mineral"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="挂牌数量" prop="number" :label-width="formLabelWidth" style="width: 48%;">
                  <el-input v-model="ruleForm.number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit" :label-width="formLabelWidth" style="width: 48%">
                  <el-select v-model="ruleForm.unit" placeholder="选择单位" >
                    <el-option label="Kg, 千克" value="Kg"></el-option>
                    <el-option label="T, 吨" value="T"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品单价" prop="price" :label-width="formLabelWidth" style="width: 56%">
                  <el-input v-model="ruleForm.price">
                    <template slot="append">元 / {{dialogform.unit}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="总价 " :label-eidth="formLabelWidth"
                              style="width: 37%">
                  {{gettotalprice}} 元
                </el-form-item>

                <el-form-item label="商品来源" prop="region" :label-width="formLabelWidth" style="width: 48%">
                  <el-select v-model="ruleForm.region" placeholder="选择商品来源">
                    <el-option label="进口货" value="import"></el-option>
                    <el-option label="非进口货" value="notimport"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="质量标准" prop="qs" :label-width="formLabelWidth" style="width: 48%">
                  <el-select v-model="ruleForm.qs" placeholder="选择商品质量标准">
                    <el-option label="良好" value="good"></el-option>
                    <el-option label="合格" value="average"></el-option>
                    <el-option label="不合格" value="bad"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
                  <el-form-item label="我的地址" prop="addr" :label-width="formLabelWidth" style="width:99%">
                    <el-input v-model="ruleForm.addr"></el-input>
                  </el-form-item>
                  <el-form-item label="撮合交易" label-width="formLabelWidth" style="width: 45%">
                    <el-radio-group v-model="ruleForm.match">
                      <el-radio label="yes">允许</el-radio>
                      <el-radio label="no" >不允许</el-radio>
                    </el-radio-group>
                  </el-form-item>
              </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即挂牌</el-button>
                    <el-button @click="resetForm('ruleForm')">重  置</el-button>
                  </div>

            </div>
          </div>
      </div>
    </div>



  </div>

</template>

<script>
import Search from '@/components/Search3';
export default {
  components: {
    Search
   },
  data() {
      return {
        dataimg: [{
				src: require('../assets/img/3.jpg'),
			},
			{
				src: require('../assets/img/1.jpg'),

			},
			{
				src: require('../assets/img/6.jpg'),
			}
		],
        formInline: {
          user: '',
          region: ''
        },
        activeIndex: '1',
        activeIndex2: '1',
        tableData: [{
          date: '2019-05-03',
          type:'出售',
          hang_number: 'G123985220',
          product_name:'煤炭',
          other:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          type:'购入',
          hang_number: 'G123985220',
          product_name:'煤炭',
          other:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }],
        ruleForm: {
          product_name: '',
          product_type: '',
          price: 0,       //单价
          number: 0,      // 数量/质量
          unit: 'Kg',      //单位
          region: '',     //来源地（进/出口）
          qs: '',         //质量标准
          match: 'yes',    //是否允许撮合
          date1: '',
          date2: '',
          delivery: false,
          type: 'sell',       //挂牌类型（买/卖方）
          resource: '',
          desc: '',
        },
        dialogform:  {
          product_name: '',
          product_type: '',
          price: 0,       //单价
          number: 0,      // 数量/质量
          unit: '',      //单位
          region: '',     //来源地（进/出口）
          qs: '',         //质量标准
          match: 'yes',    //是否允许撮合
          date1: '',
          date2: '',
          delivery: false,
          type: '',       //挂牌类型（买/卖方）
          resource: '',
          desc: '',
        },
        rules: {
          product_name: [
            { required: true, message: '必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          product_type: [
            { required: true, message: '必选项', trigger: 'change'},
          ],
          unit: [
            { required: true, message: '请选择单位', trigger: 'change'}
          ],
          price: [
            { required: true, message: '请输入商品单价', trigger: 'blur'},
            { min: 1, message: '单价最小值为1元', trigger: 'blur'}
          ],
          number: [
            { required: true, message: '请输入挂单数量/质量', trigger: 'blur'},
            { min: 1, message: '最小数量为1', trigger: 'blur'},
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur'},
            { min: 8, message: '地址最小长度为8个字符', trigger: 'blur'},
          ],
          region: [
            { required: true, message: '请选择商品来源', trigger: 'change' }
          ],
          qs: [
            { required: true, message: '请选择质量等级', trigger: 'change'}
          ],
          type: [
            { required: true, message: '请选择挂牌类型', trigger: 'change' }
          ],
        },
        match: [
          { required: true, message:'是否同意撮合交易', trigger: 'change'},
        ],
        dialogFormVisible: false,
        formLabelWidth: '100px'
      }
    },
  computed: {
    getnumber: function () {
      this.dialogform.number = this.ruleForm.number
      return this.ruleForm.number
    },
    getunit: function () {
      return this.ruleForm.unit
    },
    gettotalprice: function () {
      return this.dialogform.price * this.dialogform.number
    }
  },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('挂牌成功!');
          } else {
            console.log('挂牌失败!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      modify(){
          this.dialogFormVisible = true;
      },
      commit(){
          this.dialogFormVisible = false;
          this.$alert('修改成功', '执行结果', {
          confirmButtonText: '确定',

        });
      }
    }

};
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
  background-color: #F6F6F6;
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-box {
  width: 670px;
}




</style>
