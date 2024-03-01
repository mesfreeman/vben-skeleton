<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="45%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { templateFormSchema } from './email.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { emailTemplateAdd, emailTemplateModify } from '/@/api/system/email';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'TemplateDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        layout: 'vertical',
        schemas: templateFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增模板' : '编辑模板'));

      async function handleSubmit() {
        try {
          let result;
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (values.id == 0 || typeof values.id == undefined || !values.id) {
            result = await emailTemplateAdd(values);
          } else {
            result = await emailTemplateModify(values);
          }
          if (result.id > 0) {
            closeDrawer();
            emit('success');
            createMessage.success(getTitle.value + '成功');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
