<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增账号 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ri:lock-password-line',
              color: 'warning',
              onClick: handleModifyPwd.bind(null, record),
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
    <AccountDrawer @register="registerDrawer" @success="handleSuccess" />
    <ModifyPwdModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import AccountDrawer from './AccountDrawer.vue';
  import ModifyPwdModal from './ModifyPwdModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { accountList, accountDelete } from '/@/api/system/account';

  export default defineComponent({
    name: 'AccountManagement',
    components: { AButton, BasicTable, AccountDrawer, ModifyPwdModal, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: accountList,
        columns,
        formConfig: {
          labelWidth: 50,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          colon: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        defSort: { field: 'status', order: 'descend' },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleModifyPwd(record: Recordable) {
        openModal(true, { record });
      }

      async function handleDelete(record: Recordable) {
        const res = await accountDelete({ id: record.id });
        if (res.id > 0) {
          createMessage.success('删除账号成功');
          await reload();
        }
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleModifyPwd,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
