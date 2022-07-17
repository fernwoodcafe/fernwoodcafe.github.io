<template>
  <h1>Supplies</h1>
  <button @click="onClickNewSupply">New Supply</button>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="['supplyId', 'id', 'unitSize', 'unitCost']"
    @gridDataUpdate="onGridDataUpdate"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeDomain.MenuItemSupply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const onGridDataUpdate = (gridDataRow) => {
  props.sendCommand({
    type: "update_supply",
    payload: gridDataRow,
  });
};

const onClickNewSupply = () => {
  props.sendCommand({
    type: "create_new_supply",
    payload: {
      id: self.crypto.randomUUID(),
      supplyId: "",
    },
  });
};
</script>
