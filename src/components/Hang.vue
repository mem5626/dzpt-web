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
    <el-dialog title="编辑挂牌信息 挂牌号：T001" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="挂牌类型" prop="resource" :label-width="formLabelWidth">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="售出挂牌"></el-radio>
                    <el-radio label="需求挂牌"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="我的地址" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="质量标准" prop="region" :label-width="formLabelWidth">
                  <el-select v-model="ruleForm.region" placeholder="请选择质量标准" style="width:510px">
                    <el-option label="进口货" value="shanghai"></el-option>
                    <el-option label="非进口货" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择撮合" prop="resource" :label-width="formLabelWidth">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="挂牌类型" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="售出挂牌"></el-radio>
                    <el-radio label="需求挂牌"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="我的地址" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="质量标准" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择质量标准" style="width:380px">
                    <el-option label="进口货" value="shanghai"></el-option>
                    <el-option label="非进口货" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择撮合" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即挂牌</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择质量标准', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择挂牌类型', trigger: 'change' }
          ],
        },
        dialogFormVisible: false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      
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
  width: 80%;
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
  width: 80%;
}
.freeback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-box {
  width: 480px;
}


</style>
