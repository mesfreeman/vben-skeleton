<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="文件配置"
    okText="保存"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { configFormSchema } from './file.data';
  import { fileSaveConfig } from '/@/api/system/file';

  export default defineComponent({
    name: 'ConfigModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup() {
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        layout: 'vertical',
        schemas: configFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        await setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          let result = await fileSaveConfig(values);
          if (result.id > 0) {
            closeModal();
            createMessage.success('保存配置成功');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
