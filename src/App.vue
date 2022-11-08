<template>
  <ConfigProvider :locale="zhCn">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import zhCn from 'ant-design-vue/es/locale/zh_CN';

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
