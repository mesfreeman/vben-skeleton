<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      @change="handleChange"
      :headers="headers"
      :action="uploadUrl"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      <a-button type="primary" v-bind="{ ...getButtonProps }"> 图片上传 </a-button>
    </Upload>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useGlobSetting } from '/@/hooks/setting';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { getToken } from '/@/utils/auth';

  export default defineComponent({
    name: 'TinymceImageUpload',
    components: { AButton, Upload },
    props: {
      fullscreen: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['uploading', 'done', 'error'],
    setup(props, { emit }) {
      let uploading = false;

      const { uploadUrl } = useGlobSetting();

      const { prefixCls } = useDesign('tinymce-img-upload');

      const getButtonProps = computed(() => {
        const { disabled } = props;
        return {
          disabled,
        };
      });

      function handleChange(info: Recordable) {
        const file = info.file;
        const status = file?.status;
        const code = file?.response?.code;
        const url = file?.response?.result?.fileUrl;
        const name = file?.name;

        if (status === 'uploading') {
          if (!uploading) {
            emit('uploading', name);
            uploading = true;
          }
        } else if (status === 'done') {
          if (code === 0 && url !== '') {
            emit('done', name, url);
            uploading = false;
          } else {
            emit('error');
            uploading = false;
          }
        } else if (status === 'error') {
          emit('error');
          uploading = false;
        }
      }

      return {
        prefixCls,
        handleChange,
        uploadUrl,
        getButtonProps,
        headers: { Authorization: 'Bearer ' + getToken() },
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls} {
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 20;

    &.fullscreen {
      position: fixed;
      z-index: 10000;
    }
  }
</style>
