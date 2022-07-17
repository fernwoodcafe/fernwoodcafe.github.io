<template>
  <h1>Menu Items</h1>
  <form @submit.prevent="onClickNewMenuItem">
    <input placeholder="New Menu Item Name" v-model="newMenuItemName" />
    <button>New Menu Item - {{ newMenuItemName }}</button>
  </form>

  <nav>
    <ul>
      <li :key="item.uniqueId" v-for="item in menuItemsList.items">
        <RouterLink :to="`/menu-items/${item.menuItemName}`">{{
          item.menuItemName
        }}</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
import { ref } from "vue";

type Props = {
  menuItemsList: ReactiveArray<CafeDomain.MenuItem>;
  sendCommand: (
    Command: CafeDomain.DomainCommand<CafeDomain.MenuItem>
  ) => Promise<void>;
};

const props = defineProps<Props>();

const newMenuItemName = ref("");

const onClickNewMenuItem = () => {
  console.log("onClickNewMenuItem", newMenuItemName);
  props.sendCommand({
    type: "create_menu_item",
    payload: {
      uniqueId: crypto.randomUUID(),
      menuItemName: newMenuItemName.value,
      menuItemSupplies: [],
    },
  });
};
</script>
