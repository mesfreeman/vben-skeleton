<template>
  <CollapseContainer title="账号设置" :canExpan="false">
    <BasicForm @register="register">
      <template #avatarSlot>
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
    <a-button type="primary" @click="handleSubmit"> 保存 </a-button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import AButton from '/@/components/Button/src/BasicButton.vue';
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
      AButton,
      BasicForm,
      CollapseContainer,
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
          createMessage.error('头像上传失败');
          return;
        }

        if (info.file.status === 'done') {
          if (info.file.response.code === 0) {
            avatarUrl.value = info.file.response.result.thumbnail;
            return;
          }
          createMessage.warning(info.file.response.message);
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
