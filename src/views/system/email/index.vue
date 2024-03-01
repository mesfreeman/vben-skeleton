<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="default" @click="handleConfig">邮件配置</a-button>
        <a-button type="default" @click="handleSend">发送邮件</a-button>
        <a-button type="primary" @click="handleCreate">新增模板</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <ConfigModal @register="registerConfigModal" @success="handleSuccess" />
    <SendModal @register="registerSendModal" @success="handleSuccess" />
    <TemplateDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import TemplateDrawer from './TemplateDrawer.vue';
  import ConfigModal from './ConfigModal.vue';
  import SendModal from './SendModal.vue';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';

  import { columns, searchFormSchema } from './email.data';
  import { emailTemplateList, emailTemplateDelete, emailViewConfig } from '/@/api/system/email';

  export default defineComponent({
    name: 'EmailManagement',
    components: { TemplateDrawer, ConfigModal, SendModal, AButton, BasicTable, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerConfigModal, { openModal: openConfigModal }] = useModal();
      const [registerSendModal, { openModal: openSendModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '模板列表',
        api: emailTemplateList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          colon: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        defSort: { field: 'id', order: 'descend' },
        actionColumn: {
          width: 50,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      // 新增模板
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      // 编辑模板
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      // 删除模板
      async function handleDelete(record: Recordable) {
        const res = await emailTemplateDelete({ id: record.id });
        if (res.id > 0) {
          createMessage.success('删除模板成功');
          await reload();
        }
      }

      // 邮件配置
      function handleConfig() {
        emailViewConfig().then((config) => {
          openConfigModal(true, { record: config });
        });
      }

      // 发送邮件
      function handleSend() {
        openSendModal(true);
      }

      // 加载成功
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerConfigModal,
        registerSendModal,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleConfig,
        handleSend,
        handleSuccess,
      };
    },
  });
</script>
