<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="default" @click="collapseAll">折叠全部</a-button>
        <a-button type="default" @click="expandAll">展开全部</a-button>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #nameSlot="{ record }">
        <Icon v-if="record?.icon !== ''" :icon="record?.icon" /> {{ record?.name }}
      </template>
      <template #pathSlot="{ record }">
        <div>
          <Tag :color="getColor(record?.type)">{{ getType(record?.type) }}</Tag>
          <span style="margin-left: 10px">{{ record?.path }}</span>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:plus-square-outlined',
              disabled: record?.type === 3,
              onClick: handleCreate.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { Icon } from '/@/components/Icon';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag } from 'ant-design-vue';

  import MenuDrawer from './MenuDrawer.vue';
  import { menuList, menuDelete } from '/@/api/system/menu';
  import { columns, searchFormSchema, isDir, isMenu, isApi } from './menu.data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction, Icon, Tag, AButton },
    setup() {
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll, collapseAll }] = useTable({
        title: '菜单列表',
        api: menuList,
        columns,
        formConfig: {
          labelWidth: 70,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          colon: true,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      // In the script:
      const getColor = (type: number) => {
        return isDir(type) ? 'blue' : isMenu(type) ? 'green' : 'red';
      };

      const getType = (type: number) => {
        return isDir(type) ? '目录' : isMenu(type) ? '菜单' : '接口';
      };

      // 新增菜单
      function handleCreate(record: Recordable) {
        openDrawer(true, {
          pid: record.id,
          pname: record.name,
          ptype: record.type,
          isUpdate: false,
        });
      }

      // 编辑菜单
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      // 删除菜单
      async function handleDelete(record: Recordable) {
        const res = await menuDelete({ id: record.id });
        if (res.id > 0) {
          createMessage.success('删除菜单成功');
          await reload();
        }
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        nextTick(expandAll);
      }

      return {
        getColor,
        getType,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        expandAll,
        collapseAll,
      };
    },
    methods: { isDir, isMenu, isApi },
  });
</script>
