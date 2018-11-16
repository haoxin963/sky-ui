<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加
            </el-button>
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="主键id">
                <template scope="scope">
                    <span>{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="登陆名">
                <template scope="scope">
                    <span>{{ scope.row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
                <template scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="昵称">
                <template scope="scope">
                    <span>{{ scope.row.nickName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="邮箱">
                <template scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="success"
                               @click="handleUpdate(scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="danger"
                               @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="登陆名" prop="username">
                        <el-input v-model="form.userName" placeholder="登陆名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="username">
                        <el-input v-model="form.phone" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="username">
                        <el-input v-model="form.nickName" placeholder="昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="username">
                        <el-input v-model="form.email" placeholder="邮箱"></el-input>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchList,getObj, addObj, putObj, delObj } from '@/api/user'
    import waves from '@/directive/waves' // Waves directive
    import { parseTime } from '@/utils'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

    export default {
        name: 'table_sys_user',
        directives: {
            waves
        },
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                rules: {
                },
                form: {
                    userName : undefined,
                    phone : undefined,
                    nickName : undefined,
                    email : undefined
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                tableKey: 0
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: '有效',
                    1: '无效'
                }
                return statusMap[status]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
          handleUpdate(row) {
            getObj(row.userId).then(response => {
              this.form = response.data;
              this.dialogFormVisible = true;
              this.dialogStatus = "update";
            });
          },
            handleDelete(row) {
                delObj(row.userId)
                        .then(response => {
                            this.dialogFormVisible = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
            },
            handleCreate() {
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            create(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        addObj(this.form)
                                .then(() => {
                                    this.dialogFormVisible = false
                                    this.getList()
                                    this.$notify({
                                        title: '成功',
                                        message: '创建成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                                })
                    } else {
                        return false
                    }
                })
            },
            cancel(formName) {
                this.dialogFormVisible = false
                const set = this.$refs
                set[formName].resetFields()
            },
            update(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        this.dialogFormVisible = false
                        this.form.password = undefined
                        putObj(this.form).then(() => {
                            this.dialogFormVisible = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    } else {
                        return false
                    }
                })
            },
        }
    }
</script>
