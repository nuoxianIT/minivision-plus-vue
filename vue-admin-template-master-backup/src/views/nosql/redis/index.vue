<template>
  <div class="app-container">
    <el-row>
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>
      <el-tree
        ref="tree2"
        :data="treeNode"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="clickMe"
      />
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input size="medium" @blur="blurMe"/>
      </el-col>
    </el-row>
    <div style="margin: 10px"/>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="textarea3"
          type="textarea"
          placeholder="请输入内容"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        filterText: '',
        treeNode: [{
          id: 1,
          label: 'Redis Command',
          children: [{
            id: 4,
            label: 'String',
            children: [{
              id: 9,
              label: 'GET'
            }, {
              id: 10,
              label: 'SET'
            }, {
              id: 11,
              label: 'DEL'
            }]
          }]
        }, {
          id: 2,
          label: 'Hash',
          children: [{
            id: 5,
            label: 'HSET(HASH SET)'
          }, {
            id: 6,
            label: 'HGET(HASH GET)'
          }, {
            id: 7,
            label: 'HDEL(HASH DELETE)'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      blurMe() {
        alert(2222222222222222)
      },
      clickMe(value, data) {
        console.log(value)
        console.log(data)
        this.$router.push({path: '/example'})
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    }
  }
</script>

