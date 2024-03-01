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
      <template #pathSlot="{ model, field }">
        <Input v-model:value="model[field]" placeholder="请输入" allow-clear>
          <template #addonBefore>
            <Select
              ref="select"
              v-model:value="model['mode']"
              style="width: 118px"
              :disabled="model['type'] == 1 || model['type'] == 3"
            >
              <SelectOption
                v-for="(mode, idx) in getModeOptions(model['type'])"
                :value="mode.value"
                :key="idx"
              >
                {{ mode.label }}
              </SelectOption>
            </Select>
          </template>
        </Input>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Select, SelectOption, Input } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { formSchema } from './menu.data';
  import { menuList, menuAdd, menuModify } from '/@/api/system/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm, Select, SelectOption, Input },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        layout: 'vertical',
        schemas: formSchema,
        showActionButtonGroup: false,
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
            mode: ref(data.record.mode), // 修复select组件回显问题
          });
        }

        const treeData = await menuList({ type: [1, 2] });
        await updateSchema({
          field: 'pname',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      // 获取模式选项
      function getModeOptions(type: number) {
        const options = {
          1: [{ label: '目录地址', value: 1 }],
          2: [
            { label: '组件地址', value: 1 },
            { label: '内链地址', value: 2 },
            { label: '外链地址', value: 3 },
          ],
          3: [{ label: '接口地址', value: 1 }],
        };
        return options[type] || [];
      }

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
            createMessage.success(getTitle.value + '成功');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { getTitle, getModeOptions, registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
