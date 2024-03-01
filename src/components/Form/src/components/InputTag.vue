<template>
  <div class="input-container" ref="container" @click="handleContainerClick">
    <Tag
      v-for="(tag, index) in value"
      :key="tag"
      closable
      v-bind="attrs"
      @close="handleClose(index)"
    >
      {{ tag }}
    </Tag>
    <input
      class="input"
      v-model="inputValue"
      :placeholder="placeholder"
      @keydown="handleKeydown"
      @blur="addTag"
    />
    <CloseCircleFilled
      class="ant-input-clear-icon ant-input-clear-icon:hover"
      v-if="value.length > 0"
      @click="handleCloseAllTags"
    />
  </div>
</template>

<script lang="ts">
  import { Tag } from 'ant-design-vue';
  import { defineComponent, PropType, ref, toRefs } from 'vue';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { CloseCircleFilled } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'InputTag',
    components: {
      Tag,
      CloseCircleFilled,
    },
    props: {
      value: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      placeholder: {
        type: String,
        default: '请输入',
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { value } = toRefs(props);
      const inputValue = ref('');
      const attrs = useAttrs();

      const addTag = () => {
        if (!inputValue.value) {
          return;
        }

        if (value.value.includes(inputValue.value)) {
          inputValue.value = '';
          return;
        }

        value.value.push(inputValue.value);
        emit('change', value.value);
        inputValue.value = '';
      };

      const handleClose = (index: any) => {
        value.value.splice(index, 1);
        emit('change', value.value);
      };

      const handleInput = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        inputValue.value = target.value;
      };

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && !inputValue.value) {
          value.value.pop();
          emit('change', value.value);
        } else if (e.key === 'Enter') {
          addTag();
        }
      };

      const handleCloseAllTags = () => {
        value.value.splice(0, value.value.length);
        emit('change', value.value);
        inputValue.value = '';
      };

      const handleContainerClick = () => {
        const input = document.querySelector('.input') as HTMLInputElement;
        input.focus();
      };

      return {
        attrs,
        inputValue,
        addTag,
        handleClose,
        handleInput,
        handleKeydown,
        handleCloseAllTags,
        handleContainerClick,
      };
    },
  });
</script>

<style lang="less">
  [data-theme='dark'] {
    .input-container {
      border-color: #303030;
    }

    .input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  .input-container {
    border: 1px solid @border-color-base;
    border-radius: 2px;
    width: 100%;
    padding: 2px 11px;
    overflow: auto;
    margin-top: 0;
    display: inline-block;

    &:hover {
      border-color: #7d95ff;
    }

    .ant-tag {
      margin: 1.5px 4px 1.5px 0;
    }

    .input {
      width: 200px;
      outline: none;
      margin: 2px 0;
      border: 1px solid unset;
      background-color: unset;
    }

    .input::placeholder {
      color: #bfbfbf;
    }

    .ant-input-clear-icon {
      position: absolute;
      top: 10px;
      right: 11px;
    }
  }
</style>
