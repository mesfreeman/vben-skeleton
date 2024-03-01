<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="default" @click="handleConfig"> 文件配置</a-button>
        <div>
          <Upload
            :headers="headers"
            :action="uploadUrl"
            :showUploadList="false"
            @change="handleUpload"
            class="upload-modal-toolbar__btn"
          >
            <a-button type="primary"> 上传文件 </a-button>
          </Upload>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: '下载文件',
              icon: 'ant-design:download-outlined',
              onClick: handleDownload.bind(null, record),
            },
            {
              tooltip: '复制链接',
              icon: 'ant-design:copy-outlined',
              onClick: handleCopyUrl.bind(null, record),
            },
            {
              tooltip: '删除文件',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';
  import { downloadFile } from '/@/utils/file/download';
  import { Upload } from 'ant-design-vue';

  import ConfigModal from './ConfigModal.vue';
  import { columns, searchFormSchema } from './file.data';
  import { fileList, fileDelete, fileViewConfig } from '/@/api/system/file';
  import { getToken } from '/@/utils/auth';

  export default defineComponent({
    name: 'FileManagement',
    components: { AButton, BasicTable, TableAction, ConfigModal, Upload },
    setup() {
      const { uploadUrl } = useGlobSetting();
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '文件列表',
        api: fileList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          colon: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        defSort: { field: 'id', order: 'descend' },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      // 文件配置
      function handleConfig() {
        fileViewConfig().then((config) => {
          openModal(true, { record: config });
        });
      }

      // 上传文件
      function handleUpload(info: any) {
        if (info.file.status === 'error') {
          createMessage.error('文件上传失败');
          return;
        }

        if (info.file.status === 'done') {
          if (info.file.response.code === 0) {
            createMessage.success('文件上传成功');
            reload();
            return;
          }
          createMessage.warning(info.file.response.message);
          return;
        }
      }

      // 下载文件
      function handleDownload(record: Recordable) {
        downloadFile(record.fileUrl, record.fileName);
      }

      // 拷贝文件地址
      function handleCopyUrl(record: Recordable) {
        clipboardRef.value = record.fileUrl;
        if (unref(copiedRef)) {
          createMessage.success('文件URL已复制到剪贴板');
        }
      }

      // 删除文件
      async function handleDelete(record: Recordable) {
        const res = await fileDelete({ id: record.id });
        if (res.id > 0) {
          createMessage.success('删除文件成功');
          await reload();
        }
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleUpload,
        handleConfig,
        handleDownload,
        handleCopyUrl,
        handleDelete,
        handleSuccess,
        uploadUrl,
        headers: { Authorization: 'Bearer ' + getToken() },
      };
    },
  });
</script>
