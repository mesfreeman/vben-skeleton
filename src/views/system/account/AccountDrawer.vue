<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="600px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #avatarSolt>
        <Upload
          :headers="headers"
          :action="uploadUrl"
          :showUploadList="false"
          listType="picture-card"
          @change="handleUpload"
          class="avatar-uploader"
        >
          <img :src="avatarUrl" alt="头像" />
        </Upload>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './account.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload } from 'ant-design-vue';

  import { accountAdd, accountModify } from '/@/api/system/account';
  import { getToken } from '/@/utils/auth';
  import { useGlobSetting } from '/@/hooks/setting';
  import defaultImg from '/@/assets/images/header.jpg';

  export default defineComponent({
    name: 'AccountDrawer',
    components: { BasicDrawer, BasicForm, Upload },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      let avatarUrl = ref<string>(defaultImg);
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        avatarUrl.value = data?.record?.avatar || defaultImg;

        if (unref(isUpdate)) {
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const { uploadUrl } = useGlobSetting();
      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

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
          let result;
          const values = await validate();
          values.avatar = avatarUrl.value;
          setDrawerProps({ confirmLoading: true });
          if (values.id == 0 || typeof values.id == undefined || !values.id) {
            result = await accountAdd(values);
          } else {
            result = await accountModify(values);
          }
          if (result.id > 0) {
            closeDrawer();
            emit('success');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
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
