<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:eye-twotone',
              label: '详情',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './operateLog.data';
  import { operateLogList } from '/@/api/system/operateLog';
  import { useModal } from '/@/components/Modal';
  import DetailModal from './DetailModal.vue';

  export default defineComponent({
    name: 'OperateLog',
    components: { BasicTable, TableAction, DetailModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '操作日志',
        api: operateLogList,
        columns,
        formConfig: {
          labelWidth: 90,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        defSort: { field: 'id', order: 'descend' },
        actionColumn: {
          width: 60,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      // 查看详情
      function handleDetail(record: Recordable) {
        openModal(true, { record });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerModal,
        registerTable,
        handleDetail,
        handleSuccess,
      };
    },
  });
</script>
