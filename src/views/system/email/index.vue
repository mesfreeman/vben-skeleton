<template>
  <PageWrapper>
    <CollapseContainer
      title="邮件配置"
      helpMessage="为了验证邮箱配置可用性，保存后会给收件人发送一封邮件"
      :canExpan="false"
    >
      <BasicForm @register="register" />
      <Button type="primary" @click="handleSubmit"> 保存 </Button>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { configFormSchema } from './email.data';
  import { emailSaveConfig, emailViewConfig } from '/@/api/system/email';

  export default defineComponent({
    components: {
      BasicForm,
      PageWrapper,
      CollapseContainer,
      Button,
    },
    setup() {
      const { createMessage } = useMessage();
      const [register, { setFieldsValue, validate }] = useForm({
        layout: 'vertical',
        schemas: configFormSchema,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        emailViewConfig().then((config) => {
          setFieldsValue({ ...config });
        });
      });

      // 提交
      async function handleSubmit() {
        try {
          const values = await validate();
          const result = await emailSaveConfig(values);
          if (result.id > 0) {
            createMessage.success('保存成功');
          }
        } catch (error) {}
      }

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
