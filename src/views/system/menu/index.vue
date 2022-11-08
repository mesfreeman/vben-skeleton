<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="default" @click="collapseAll">折叠全部</a-button>
        <a-button type="default" @click="expandAll">展开全部</a-button>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #nameSlot="{ record }">
        <Icon v-if="record.icon !== ''" :icon="record.icon" /> {{ record.name }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:plus-square-outlined',
              disabled: record.type === 3,
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
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { menuList, menuDelete } from '/@/api/system/menu';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';
  import { notification } from 'ant-design-vue/es';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction, Icon },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll, collapseAll }] = useTable({
        title: '菜单列表',
        api: menuList,
        columns,
        formConfig: {
          labelWidth: 70,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
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
          notification.success({
            message: '删除菜单成功',
            duration: 3,
          });
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
  });
</script>
