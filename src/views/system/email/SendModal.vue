<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="发送邮件"
    okText="发送"
    width="65%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useModalInner } from '/@/components/Modal';
  import { Modal } from 'ant-design-vue';

  import { sendFormSchema } from './email.data';
  import { emailBatchSend } from '/@/api/system/email';

  export default defineComponent({
    name: 'SendModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup() {
      const [registerForm, { resetFields, validate }] = useForm({
        layout: 'vertical',
        schemas: sendFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        await resetFields();
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          delete values.templateId;
          setModalProps({ confirmLoading: true });
          let result = await emailBatchSend(values);
          if (result.total > 0) {
            closeModal();
            Modal.info({
              title: '发送结果通知',
              content: `收件人共 ${result.total} 个，成功 ${result.success} 个，失败 ${result.fail} 个`,
            });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
