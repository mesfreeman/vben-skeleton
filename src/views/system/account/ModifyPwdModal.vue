<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="修改密码" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { modifyPwdFormSchema } from './account.data';
  import { accountModifyPwd } from '/@/api/system/account';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'ModifyPwdModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const rowId = ref('');
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 65,
        baseColProps: { span: 24 },
        schemas: modifyPwdFormSchema,
        showActionButtonGroup: false,
        actionColOptions: { span: 24 },
        colon: true,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        rowId.value = data.record.id;
        await setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          let result = await accountModifyPwd(values);
          if (result.id > 0) {
            closeModal();
            emit('success');
            createMessage.success('修改密码成功');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
