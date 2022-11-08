<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './loginLog.data';
  import { loginLogList } from '/@/api/system/loginLog';

  export default defineComponent({
    name: 'LoginLog',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '登录日志',
        api: loginLogList,
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
        defSort: { field: 'id', order: 'descend' },
      });

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
      };
    },
  });
</script>
