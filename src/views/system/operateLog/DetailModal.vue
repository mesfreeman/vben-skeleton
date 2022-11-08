<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="操作详情" :footer="null" width="55%">
    <Description
      :column="2"
      size="small"
      :bordered="true"
      :data="detailInfo"
      :schema="detailSchema"
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description';
  import { detailSchema } from './operateLog.data';

  export default defineComponent({
    components: { BasicModal, Description },
    setup() {
      const modelRef = ref({});
      const [registerModal, { closeModal }] = useModalInner((data) => {
        modelRef.value = data.record;
      });
      return {
        registerModal,
        closeModal,
        detailInfo: modelRef,
        detailSchema,
      };
    },
  });
</script>
