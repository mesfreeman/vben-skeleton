<template>
  <CollapseContainer
    title="修改密码"
    :canExpan="false"
    helpMessage="修改成功后会自动退出当前登录账号"
  >
    <div class="bg-white">
      <BasicForm @register="register" />
      <div>
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { PasswordFormSchema } from '/@/views/base/myInfo/myInfo.data';
  import { modifyMypwd } from '/@/api/common';
  import { useAdminStore } from '/@/store/modules/admin';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'ModifyPassword',
    components: { BasicForm, CollapseContainer },
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, resetFields }] = useForm({
        labelWidth: 75,
        schemas: PasswordFormSchema,
        showActionButtonGroup: false,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { oldPwd, newPwd } = values;
          const result = await modifyMypwd({ oldPwd: oldPwd, newPwd: newPwd });
          if (result.id > 0) {
            createMessage.success('修改密码成功，即将退出请重新登录~');
            setTimeout(() => {
              useAdminStore().logout(true);
            }, 3000);
          }
        } catch (error) {}
      }
      return { register, resetFields, handleSubmit };
    },
  });
</script>
