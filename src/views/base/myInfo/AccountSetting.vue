<template>
  <CollapseContainer title="账号设置" :canExpan="false">
    <BasicForm @register="register">
      <template #avatarSolt>
        <Upload
          :headers="headers"
          :action="uploadUrl"
          :showUploadList="false"
          listType="picture-card"
          @change="handleUpload"
          class="avatar-uploader"
        >
          <img :src="avatarUrl || defaultImg" alt="头像" />
        </Upload>
      </template>
    </BasicForm>
    <Button type="primary" @click="handleSubmit"> 保存 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload } from 'ant-design-vue';

  import { accountFormSchema } from './myInfo.data';
  import { useAdminStore } from '/@/store/modules/admin';
  import { modifyMyInfo } from '/@/api/common';
  import { getToken } from '/@/utils/auth';
  import { useGlobSetting } from '/@/hooks/setting';
  import defaultImg from '/@/assets/images/header.jpg';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      Upload,
    },
    setup() {
      const { createMessage } = useMessage();
      const adminStore = useAdminStore();
      const { uploadUrl } = useGlobSetting();
      let avatarUrl = ref(adminStore.getAdminInfo?.avatar || defaultImg);
      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 50,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        await setFieldsValue(adminStore.getAdminInfo);
      });

      // 上传头像
      function handleUpload(info: any) {
        if (info.file.status === 'error') {
          createMessage.error('头像上传失败', 3);
          return;
        }

        if (info.file.status === 'done') {
          if (info.file.response.code === 0) {
            avatarUrl.value = info.file.response.result.thumbail;
            return;
          }
          createMessage.warning(info.file.response.message, 3);
          return;
        }
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          values.avatar = avatarUrl.value;
          const result = await modifyMyInfo(values);
          if (result.id > 0) {
            const adminInfo = adminStore.getAdminInfo;
            adminInfo.username = values.username;
            adminInfo.nickname = values.nickname;
            adminInfo.avatar = values.avatar;
            adminInfo.email = values.email;
            adminInfo.phone = values.phone;
            adminStore.setAdminInfo(adminInfo);
            createMessage.success('保存成功');
          }
        } catch (error) {}
      }

      return {
        register,
        defaultImg,
        avatarUrl,
        uploadUrl,
        handleUpload,
        handleSubmit,
        headers: { Authorization: 'Bearer ' + getToken() },
      };
    },
  });
</script>

<style lang="less" scoped>
  .avatar-uploader > .ant-upload {
    width: 100px;
    height: 100px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
