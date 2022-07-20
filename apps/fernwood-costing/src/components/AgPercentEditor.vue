<template>
  <input ref="input" class="percent" type="number" v-model="percent" />
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
      }
    });
  },
  setup(props: Props) {
    const percent = ref(props.params.value * 100);
    return {
      percent,
      getValue: () => percent.value / 100,
    };
  },
});
</script>
<style>
.ag-root-wrapper input.percent {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
