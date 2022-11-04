<template>
  <input ref="input" type="date" v-model="date" />
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { defineComponent, ref } from "vue";
type Props = {
  params: ICellEditorParams;
};

export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.input instanceof HTMLInputElement) {
        this.$refs.input.focus();
        this.$refs.input.select();
      }
    });
  },
  setup(props: Props) {
    const date = ref(props.params.value);
    return {
      date,
      getValue: () => date.value,
    };
  },
});
</script>
<style>
.ag-root-wrapper input[type="date"] {
  outline: thin solid red;
}
</style>
