<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { formSchema } from './menu.data';
  import { menuList, menuAdd, menuModify } from '/@/api/system/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // 新增子菜单，将父菜单相关参数写入
        if (data?.pid > 0) {
          await setFieldsValue({ pid: data.pid, pname: data.pname, type: data.ptype + 1 });
        }

        if (unref(isUpdate)) {
          await setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await menuList({ type: [1, 2] });
        await updateSchema({
          field: 'pname',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          let result;
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (values.id == 0 || typeof values.id == undefined || !values.id) {
            result = await menuAdd(values);
          } else {
            result = await menuModify(values);
          }
          if (result.id > 0) {
            closeDrawer();
            emit('success');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
