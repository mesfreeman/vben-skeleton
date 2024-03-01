<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" alt="" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <BasicTable @register="register" class="error-handle-table">
      <template #action="{ record }">
        <TableAction :actions="[{ label: '详情', onClick: handleDetail.bind(null, record) }]" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
  import type { ErrorLogInfo } from '/#/store';
  import { watch, ref, nextTick } from 'vue';
  import DetailModal from './DetailModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table/index';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useErrorLogStore } from '/@/store/modules/errorLog';
  import { getColumns } from './data';
  import { cloneDeep } from 'lodash-es';

  const rowInfo = ref<ErrorLogInfo>();
  const imgList = ref<string[]>([]);

  const errorLogStore = useErrorLogStore();
  const [register, { setTableData }] = useTable({
    title: '错误日志列表',
    columns: getColumns(),
    actionColumn: {
      width: 80,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const [registerModal, { openModal }] = useModal();

  watch(
    () => errorLogStore.getErrorLogInfoList,
    (list) => {
      nextTick(() => {
        setTableData(cloneDeep(list));
      });
    },
    {
      immediate: true,
    },
  );
  const { createMessage } = useMessage();
  if (import.meta.env.DEV) {
    createMessage.info('只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效.');
  }
  // 查看详情
  function handleDetail(row: ErrorLogInfo) {
    rowInfo.value = row;
    openModal(true);
  }
</script>
