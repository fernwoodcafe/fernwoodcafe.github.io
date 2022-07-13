<template>
  <button @click="onClick">New</button>
  <AgGridComponent
    :gridData="suppliesList"
    @gridDataUpdate="updateSupply"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeSupply>;
  updateSupply: (data: any) => Promise<void>;
};

const props = defineProps<Props>();

const onClick = () => {
  props.suppliesList.items.push({
    id: self.crypto.randomUUID(),
    supplyId: "",
  });
};
</script>
